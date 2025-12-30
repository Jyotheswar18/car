const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { bookings, cars, users } = require('../data/mockData');
const authUtils = require('../utils/auth');

// Create booking
router.post('/', authenticate, (req, res) => {
  const { carId, pickupDate, dropoffDate, pickupLocation, dropoffLocation, needsInsurance } = req.body;

  if (!carId || !pickupDate || !dropoffDate || !pickupLocation || !dropoffLocation) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const car = cars.get(carId);
  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }

  const days = authUtils.calculateRentalDays(pickupDate, dropoffDate);
  const totalCost = authUtils.calculateTotalCost(car.pricePerDay, days, needsInsurance);
  const bookingReference = authUtils.generateBookingReference();

  const booking = {
    id: bookingReference,
    userId: req.user.userId,
    carId,
    carDetails: {
      make: car.make,
      model: car.model,
      year: car.year
    },
    pickupDate: new Date(pickupDate),
    dropoffDate: new Date(dropoffDate),
    pickupLocation,
    dropoffLocation,
    days,
    dailyRate: car.pricePerDay,
    needsInsurance,
    totalCost,
    status: 'pending', // pending, confirmed, completed, cancelled
    paymentStatus: 'unpaid',
    createdAt: new Date()
  };

  bookings.set(bookingReference, booking);

  res.status(201).json({
    message: 'Booking created successfully',
    booking
  });
});

// Get user's bookings
router.get('/', authenticate, (req, res) => {
  const userBookings = Array.from(bookings.values())
    .filter(booking => booking.userId === req.user.userId)
    .sort((a, b) => b.createdAt - a.createdAt);

  res.json(userBookings);
});

// Get booking details
router.get('/:id', authenticate, (req, res) => {
  const booking = bookings.get(req.params.id);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  if (booking.userId !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  res.json(booking);
});

// Cancel booking
router.put('/:id/cancel', authenticate, (req, res) => {
  const booking = bookings.get(req.params.id);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  if (booking.userId !== req.user.userId) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  if (booking.status === 'cancelled' || booking.status === 'completed') {
    return res.status(400).json({ error: 'Cannot cancel this booking' });
  }

  booking.status = 'cancelled';
  booking.updatedAt = new Date();

  res.json({
    message: 'Booking cancelled successfully',
    booking
  });
});

module.exports = router;
