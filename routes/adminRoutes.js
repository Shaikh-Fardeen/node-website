const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Admin messages view
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ submittedAt: -1 });

    let html = `
      <h1>Submitted Messages</h1>
      <table border="1" cellpadding="10">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>Submitted At</th>
        </tr>
    `;

    messages.forEach(msg => {
      html += `
        <tr>
          <td>${msg.name}</td>
          <td>${msg.email}</td>
          <td>${msg.message}</td>
          <td>${new Date(msg.submittedAt).toLocaleString()}</td>
        </tr>
      `;
    });

    html += `</table><br><a href="/">Back to Home</a>`;

    res.send(html);
  } catch (error) {
    console.error('❌ Error fetching messages:', error);
    res.status(500).send('Error loading messages');
  }
});

module.exports = router;
