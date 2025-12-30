import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
      pickupDate,
      dropoffDate,
      pickupLocation,
      dropoffLocation
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Ride</h1>
          <p>Browse through our exclusive collection of vehicles</p>
        </div>
      </section>

      {/* Search Form */}
      <section className="search-section">
        <div className="container">
          <div className="search-form-container">
            <h2>Book Your Car Now</h2>
            <form className="search-form" onSubmit={handleSearch}>
              <div className="form-group">
                <label>Pickup Location</label>
                <input
                  type="text"
                  placeholder="Where do you pick up?"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Dropoff Location</label>
                <input
                  type="text"
                  placeholder="Where do you drop off?"
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Pickup Date</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Dropoff Date</label>
                <input
                  type="date"
                  value={dropoffDate}
                  onChange={(e) => setDropoffDate(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary search-btn">
                Search Cars
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose CarRent?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Wide Selection</h3>
              <p>Choose from hundreds of vehicles in our fleet</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Best Prices</h3>
              <p>Competitive rates with no hidden charges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Easy Booking</h3>
              <p>Simple and fast booking process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Flexible Cancellation</h3>
              <p>Cancel up to 48 hours before your trip</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3>Insurance Included</h3>
              <p>Optional insurance for peace of mind</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Rent?</h2>
          <p>Start your journey with CarRent today</p>
          <button className="btn btn-primary" onClick={() => navigate('/search')}>
            Browse All Cars
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
