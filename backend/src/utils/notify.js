const SystemNotification = require('../models/SystemNotification');
const User = require('../models/User');
const { sendEmail } = require('./messaging');

async function notify({ userId, title, message, category, relatedEntityId, urgency = 'normal' }) {
  if (!userId) return;
  try {
    await SystemNotification.create({ userId, title, message, category, relatedEntityId, urgency });
    const user = await User.findById(userId).select('email name');
    if (user?.email) await sendEmail(user.email, `VyaparSetu: ${title}`, message);
  } catch (err) {
    console.error('[notify] failed:', err.message);
  }
}

module.exports = { notify };