const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { bookings, payments } = require('../data/mockData');

// Create payment for booking
router.post('/', authenticate, (req, res) => {
  const { bookingId, amount, paymentMethod, cardDetails } = req.body;

  if (!bookingId || !amount || !paymentMethod) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const booking = bookings.get(bookingId);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  if (booking.userId !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  // Simulate payment processing
  const isValidCard = cardDetails && cardDetails.number && cardDetails.number.endsWith('1234');
  const paymentStatus = isValidCard || paymentMethod === 'paypal' ? 'completed' : 'failed';

  const payment = {
    id: 'PAY' + Date.now(),
    bookingId,
    userId: req.user.userId,
    amount,
    paymentMethod,
    status: paymentStatus,
    transactionId: 'TXN' + Date.now(),
    createdAt: new Date()
  };

  payments.set(payment.id, payment);

  if (paymentStatus === 'completed') {
    booking.paymentStatus = 'paid';
    booking.status = 'confirmed';
  }

  res.status(201).json({
    message: 'Payment processed',
    payment,
    booking
  });
});

// Get payment details
router.get('/:id', authenticate, (req, res) => {
  const payment = payments.get(req.params.id);

  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  if (payment.userId !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  res.json(payment);
});

module.exports = router;
