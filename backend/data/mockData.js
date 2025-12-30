// Mock database with sample data
const users = new Map([
  ['1', {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36CHhaPi', // password123
    phone: '+1 (555) 123-4567',
    licenseNumber: 'DL123456',
    createdAt: new Date('2023-01-15')
  }]
]);

const cars = new Map([
  ['C1', {
    id: 'C1',
    make: 'Toyota',
    model: 'Camry',
    year: 2023,
    type: 'Sedan',
    pricePerDay: 65,
    image: '/images/camry.jpg',
    description: 'Comfortable and reliable sedan perfect for business trips',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    luggage: 4,
    available: true,
    rating: 4.8,
    reviews: 245
  }],
  ['C2', {
    id: 'C2',
    make: 'Honda',
    model: 'CR-V',
    year: 2023,
    type: 'SUV',
    pricePerDay: 85,
    image: '/images/crv.jpg',
    description: 'Spacious SUV for family adventures',
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    seats: 5,
    luggage: 5,
    available: true,
    rating: 4.9,
    reviews: 312
  }],
  ['C3', {
    id: 'C3',
    make: 'BMW',
    model: '3 Series',
    year: 2023,
    type: 'Luxury Sedan',
    pricePerDay: 150,
    image: '/images/bmw.jpg',
    description: 'Premium luxury sedan with advanced features',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 5,
    luggage: 3,
    available: true,
    rating: 4.9,
    reviews: 189
  }],
  ['C4', {
    id: 'C4',
    make: 'Tesla',
    model: 'Model 3',
    year: 2023,
    type: 'Electric',
    pricePerDay: 120,
    image: '/images/tesla.jpg',
    description: 'Eco-friendly electric vehicle with cutting-edge technology',
    transmission: 'Automatic',
    fuelType: 'Electric',
    seats: 5,
    luggage: 4,
    available: true,
    rating: 4.8,
    reviews: 267
  }],
  ['C5', {
    id: 'C5',
    make: 'Nissan',
    model: 'Altima',
    year: 2023,
    type: 'Sedan',
    pricePerDay: 60,
    image: '/images/altima.jpg',
    description: 'Budget-friendly sedan with excellent fuel economy',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    seats: 5,
    luggage: 4,
    available: true,
    rating: 4.6,
    reviews: 178
  }],
  ['C6', {
    id: 'C6',
    make: 'Mercedes',
    model: 'C-Class',
    year: 2023,
    type: 'Luxury Sedan',
    pricePerDay: 180,
    image: '/images/mercedes.jpg',
    description: 'Ultimate luxury with premium comfort and performance',
    transmission: 'Automatic',
    fuelType: 'Diesel',
    seats: 5,
    luggage: 3,
    available: true,
    rating: 4.9,
    reviews: 298
  }]
]);

const bookings = new Map();
const payments = new Map();

module.exports = {
  users,
  cars,
  bookings,
  payments
};
