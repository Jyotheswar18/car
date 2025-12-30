const jwt = require('jsonwebtoken');

// Mock user storage (replace with database later)
const users = new Map();
const tokens = new Map();

exports.generateToken = (userId) => {
  const token = jwt.sign(
    { userId, timestamp: Date.now() },
    process.env.JWT_SECRET || 'secret_key',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
  return token;
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
  } catch (err) {
    return null;
  }
};

exports.hashPassword = (password) => {
  const bcrypt = require('bcryptjs');
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

exports.comparePassword = (password, hashedPassword) => {
  const bcrypt = require('bcryptjs');
  return bcrypt.compareSync(password, hashedPassword);
};

exports.generateBookingReference = () => {
  return 'BK' + Date.now().toString().slice(-10);
};

exports.calculateRentalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays || 1;
};

exports.calculateTotalCost = (dailyRate, days, insurance = false) => {
  let total = dailyRate * days;
  if (insurance) {
    total += 50 * days; // $50 per day insurance
  }
  return parseFloat(total.toFixed(2));
};
