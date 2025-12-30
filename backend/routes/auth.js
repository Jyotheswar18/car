const express = require('express');
const router = express.Router();
const { users } = require('../data/mockData');
const authUtils = require('../utils/auth');
const authenticate = require('../middleware/authenticate');

// Register
router.post('/register', (req, res) => {
  const { name, email, password, phone, licenseNumber } = req.body;

  if (!name || !email || !password || !licenseNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if user exists
  for (let user of users.values()) {
    if (user.email === email) {
      return res.status(400).json({ error: 'Email already registered' });
    }
  }

  const id = Date.now().toString();
  const hashedPassword = authUtils.hashPassword(password);

  const newUser = {
    id,
    name,
    email,
    password: hashedPassword,
    phone,
    licenseNumber,
    createdAt: new Date()
  };

  users.set(id, newUser);

  const token = authUtils.generateToken(id);
  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: { id, name, email, phone, licenseNumber }
  });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  let user = null;
  for (let u of users.values()) {
    if (u.email === email) {
      user = u;
      break;
    }
  }

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isValidPassword = authUtils.comparePassword(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = authUtils.generateToken(user.id);
  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      licenseNumber: user.licenseNumber
    }
  });
});

// Get current user
router.get('/me', authenticate, (req, res) => {
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

module.exports = router;
