const express = require('express');
const router = express.Router();
const { cars } = require('../data/mockData');

// Get all cars
router.get('/', (req, res) => {
  const { type, minPrice, maxPrice, carType } = req.query;

  let filteredCars = Array.from(cars.values());

  if (carType) {
    filteredCars = filteredCars.filter(car => car.type.toLowerCase() === carType.toLowerCase());
  }

  if (minPrice) {
    filteredCars = filteredCars.filter(car => car.pricePerDay >= parseFloat(minPrice));
  }

  if (maxPrice) {
    filteredCars = filteredCars.filter(car => car.pricePerDay <= parseFloat(maxPrice));
  }

  res.json(filteredCars);
});

// Get car by ID
router.get('/:id', (req, res) => {
  const car = cars.get(req.params.id);
  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }
  res.json(car);
});

// Get car types (for filter options)
router.get('/types/list', (req, res) => {
  const types = [...new Set(Array.from(cars.values()).map(car => car.type))];
  res.json(types);
});

module.exports = router;
