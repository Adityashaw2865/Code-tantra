const express = require('express');
const path = require('path');
const fs = require('fs');
const DocumentVaultItem = require('../models/DocumentVaultItem');
const BusinessProfile = require('../models/BusinessProfile');
const { requireAuth, requireRole } = require('../middleware/auth');
const { upload, verifyMagicBytes } = require('../middleware/upload');
const { writeAudit } = require('../utils/audit');

const router = express.Router();

// POST /api/documents - upload a file for a business's document vault
router.post('/', requireAuth, requireRole('applicant'), upload.single('file'), verifyMagicBytes, async (req, res) => {
  const { businessId, documentKey, name, category } = req.body;
  if (!req.file) return res.status(400).json({ error: 'No file uploaded (field name must be "file")' });

  const business = await BusinessProfile.findById(businessId);
  if (!business || String(business.applicantId) !== String(req.user._id)) {
    return res.status(403).json({ error: 'This business profile does not belong to you' });
  }

  // If a document with this key already exists for the business, bump the version
  const existing = await DocumentVaultItem.findOne({ businessId, documentKey }).sort({ version: -1 });
  const nextVersion = existing ? existing.version + 1 : 1;

  const doc = await DocumentVaultItem.create({
    businessId,
    documentKey,
    name: name || req.file.originalname,
    category,
    fileName: req.file.originalname,
    fileSize: `${(req.file.size / 1024).toFixed(1)} KB`,
    mimeType: req.file.mimetype,
    storagePath: req.file.path,
    version: nextVersion,
    verificationStatus: 'under_verification'
  });

  const safeDoc = doc.toObject();
  delete safeDoc.storagePath;
  res.status(201).json({ document: safeDoc });
});

// GET /api/documents[?businessId=...] - applicant: own businesses' vault; staff: all (or one business)
router.get('/', requireAuth, async (req, res) => {
  const filter = {};
  if (req.user.role === 'applicant') {
    const mine = await BusinessProfile.find({ applicantId: req.user._id }).select('_id');
    const ids = mine.map((b) => String(b._id));
    if (req.query.businessId && !ids.includes(String(req.query.businessId))) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    filter.businessId = req.query.businessId || { $in: ids };
  } else if (req.query.businessId) {
    filter.businessId = req.query.businessId;
  }
  const documents = await DocumentVaultItem.find(filter).sort({ uploadDate: -1 });
  res.json({ documents });
});

// DELETE /api/documents/:id - owner removes a vault document
router.delete('/:id', requireAuth, requireRole('applicant'), async (req, res) => {
  const doc = await DocumentVaultItem.findById(req.params.id).select('+storagePath');
  if (!doc) return res.status(404).json({ error: 'Document not found' });
  const business = await BusinessProfile.findById(doc.businessId);
  if (!business || String(business.applicantId) !== String(req.user._id)) {
    return res.status(403).json({ error: 'Not authorized' });
  }
  if (doc.storagePath && fs.existsSync(doc.storagePath)) fs.unlinkSync(doc.storagePath);
  await doc.deleteOne();
  res.json({ deleted: true });
});

// GET /api/documents/:id/download - streams the actual file (owner or staff only)
router.get('/:id/download', requireAuth, async (req, res) => {
  const doc = await DocumentVaultItem.findById(req.params.id).select('+storagePath');
  if (!doc) return res.status(404).json({ error: 'Document not found' });

  const business = await BusinessProfile.findById(doc.businessId);
  const staffRoles = ['officer', 'inspector', 'admin'];
  if (!business || (String(business.applicantId) !== String(req.user._id) && !staffRoles.includes(req.user.role))) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  if (!fs.existsSync(doc.storagePath)) {
    return res.status(410).json({ error: 'File is missing from storage' });
  }

  res.download(doc.storagePath, doc.fileName);
});

// PATCH /api/documents/:id/verify - officer verifies/rejects a document
router.patch('/:id/verify', requireAuth, requireRole('officer', 'admin'), async (req, res) => {
  const { verificationStatus, rejectionReason } = req.body;
  const doc = await DocumentVaultItem.findById(req.params.id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });

  doc.verificationStatus = verificationStatus;
  doc.verifiedBy = req.user.name;
  doc.verificationDate = new Date();
  if (rejectionReason) doc.rejectionReason = rejectionReason;
  await doc.save();

  await writeAudit({
    req,
    action: 'VERIFY_DOCUMENT',
    entityType: 'Document',
    entityId: doc._id,
    description: `${doc.name} marked as ${verificationStatus}`
  });

  res.json({ document: doc });
});

module.exports = router;
