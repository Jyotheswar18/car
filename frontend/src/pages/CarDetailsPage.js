import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CarDetailsPage.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await axios.get(`/api/cars/${id}`);
      setCar(response.data);
    } catch (err) {
      setError('Failed to load car details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading car details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!car) return <div className="error-message">Car not found</div>;

  return (
    <div className="car-details-container">
      <div className="container">
        <button className="back-btn" onClick={() => navigate('/search')}>
          ← Back to Search
        </button>

        <div className="car-details-layout">
          {/* Image Section */}
          <div className="car-image-section">
            <img
              src={`https://via.placeholder.com/600x400?text=${car.make}+${car.model}`}
              alt={`${car.make} ${car.model}`}
              className="car-main-image"
            />
          </div>

          {/* Details Section */}
          <div className="car-details-section">
            <div className="car-header">
              <h1>{car.year} {car.make} {car.model}</h1>
              <p className="car-type-badge">{car.type}</p>
            </div>

            {/* Ratings */}
            <div className="car-rating-section">
              <span className="rating">★★★★★ {car.rating}</span>
              <span className="reviews">Based on {car.reviews} reviews</span>
            </div>

            {/* Description */}
            <p className="car-description">{car.description}</p>

            {/* Specifications */}
            <div className="specs-section">
              <h3>Vehicle Specifications</h3>
              <div className="specs-grid">
                <div className="spec">
                  <label>Transmission</label>
                  <value>{car.transmission}</value>
                </div>
                <div className="spec">
                  <label>Fuel Type</label>
                  <value>{car.fuelType}</value>
                </div>
                <div className="spec">
                  <label>Passengers</label>
                  <value>{car.seats} Seats</value>
                </div>
                <div className="spec">
                  <label>Luggage</label>
                  <value>{car.luggage} Bags</value>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="amenities-section">
              <h3>Amenities</h3>
              <div className="amenities-list">
                <span className="amenity">📱 Bluetooth</span>
                <span className="amenity">🎵 Premium Sound System</span>
                <span className="amenity">🧊 Air Conditioning</span>
                <span className="amenity">🛡️ Safety Features</span>
                <span className="amenity">🚙 Power Steering</span>
                <span className="amenity">📡 Navigation System</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="pricing-section">
              <h3>Rental Price</h3>
              <div className="price-display">
                <span className="price-amount">${car.pricePerDay}</span>
                <span className="price-period">per day</span>
              </div>
              <p className="price-note">Insurance and taxes may apply</p>
            </div>

            {/* Insurance Options */}
            <div className="insurance-section">
              <h3>Insurance Options</h3>
              <label className="insurance-option">
                <input type="checkbox" />
                <span>Basic Coverage - $25/day</span>
              </label>
              <label className="insurance-option">
                <input type="checkbox" />
                <span>Premium Coverage - $50/day</span>
              </label>
            </div>

            {/* CTA */}
            <button 
              className="btn btn-primary book-btn"
              onClick={() => navigate(`/booking/${id}`)}
            >
              Book This Car Now
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <h3>Rental Terms & Conditions</h3>
          <ul>
            <li>Minimum age requirement: 21 years old with valid driver's license</li>
            <li>Credit card required for reservation</li>
            <li>Cancellation allowed up to 48 hours before pickup</li>
            <li>Fuel policy: Full to Full (return car with full tank)</li>
            <li>Unlimited mileage included</li>
            <li>Security deposit required at pickup</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
