const SystemNotification = require('../models/SystemNotification');

/**
 * Creates a SystemNotification for a user. Never throws - a failed
 * notification should not break the flow (application submit, inspection
 * scheduling, etc) that triggered it.
 */
async function notify({ userId, title, message, category, relatedEntityId, urgency = 'normal' }) {
  if (!userId) return;
  try {
    await SystemNotification.create({ userId, title, message, category, relatedEntityId, urgency });
  } catch (err) {
    console.error('[notify] failed:', err.message);
  }
}

module.exports = { notify };
