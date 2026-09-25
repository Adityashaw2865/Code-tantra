const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { fromFile: fileTypeFromFile } = require('file-type');

const uploadDir = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = crypto.randomBytes(8).toString('hex');
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${unique}${ext}`);
  }
});

const ALLOWED_MIME = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);
const ALLOWED_EXT = new Set(['.pdf', '.jpg', '.jpeg', '.png', '.webp']);
const maxSizeBytes = Number(process.env.MAX_UPLOAD_MB || 10) * 1024 * 1024;

const upload = multer({
  storage,
  limits: { fileSize: maxSizeBytes },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_MIME.has(file.mimetype) || !ALLOWED_EXT.has(ext)) {
      return cb(new Error('Only PDF, JPEG, PNG or WEBP files are allowed'));
    }
    cb(null, true);
  }
});

// Client-reported mimetype/extension can be spoofed (fileFilter above only checks those).
// This re-checks the file's actual magic bytes after it lands on disk, and deletes it on mismatch.
// Use as the route's second middleware, right after `upload.single(...)`.
async function verifyMagicBytes(req, res, next) {
  if (!req.file) return next();
  try {
    const detected = await fileTypeFromFile(req.file.path);
    const ok = detected && ALLOWED_MIME.has(detected.mime);
    if (!ok) {
      fs.unlink(req.file.path, () => {});
      return res.status(400).json({ error: 'File content does not match an allowed type (PDF/JPEG/PNG/WEBP)' });
    }
    next();
  } catch (err) {
    fs.unlink(req.file.path, () => {});
    next(err);
  }
}

module.exports = { upload, uploadDir, verifyMagicBytes };
