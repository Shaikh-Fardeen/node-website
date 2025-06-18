const express = require('express');
const path = require('path');
const router = express.Router();

// Route: Home Page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route: About Page
router.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/about.html'));
});

// Route: Contact Page
router.get('/contact',(req, res) => {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
})


// router.get('/thank-you', (req, res) => {
//   res.sendFile(path.join(__dirname, '..public/thank-you.html'));
// });


module.exports = router;
