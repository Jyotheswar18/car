const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { users } = require('../data/mockData');

// Get user profile
router.get('/profile', authenticate, (req, res) => {
  const user = users.get(req.user.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    licenseNumber: user.licenseNumber,
    createdAt: user.createdAt
  });
});

// Update user profile
router.put('/profile', authenticate, (req, res) => {
  const { name, phone, licenseNumber } = req.body;
  const user = users.get(req.user.userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (licenseNumber) user.licenseNumber = licenseNumber;

  user.updatedAt = new Date();

  res.json({
    message: 'Profile updated successfully',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      licenseNumber: user.licenseNumber
    }
  });
});

module.exports = router;
