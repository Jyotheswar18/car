import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookingPage.css';

const BookingPage = ({ user }) => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState({
    pickupDate: '',
    dropoffDate: '',
    pickupLocation: '',
    dropoffLocation: '',
    needsInsurance: false
  });
  const [totalCost, setTotalCost] = useState(0);
  const [days, setDays] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  useEffect(() => {
    calculateCost();
  }, [bookingData.pickupDate, bookingData.dropoffDate, bookingData.needsInsurance]);

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

  const calculateCost = () => {
    if (!bookingData.pickupDate || !bookingData.dropoffDate) return;

    const start = new Date(bookingData.pickupDate);
    const end = new Date(bookingData.dropoffDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    setDays(diffDays);

    if (car) {
      let cost = car.pricePerDay * diffDays;
      if (bookingData.needsInsurance) {
        cost += 50 * diffDays;
      }
      setTotalCost(parseFloat(cost.toFixed(2)));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingData({
      ...bookingData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!bookingData.pickupDate || !bookingData.dropoffDate || !bookingData.pickupLocation) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/bookings',
        {
          carId: id,
          ...bookingData
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Navigate to payment page
      navigate(`/booking-confirmation/${response.data.booking.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!car) return <div className="error-message">Car not found</div>;

  return (
    <div className="booking-container">
      <div className="container">
        <h1>Complete Your Booking</h1>

        <div className="booking-layout">
          {/* Car Summary */}
          <div className="car-summary">
            <h2>Rental Summary</h2>
            <div className="summary-card">
              <img
                src={`https://via.placeholder.com/300x200?text=${car.make}+${car.model}`}
                alt={`${car.make} ${car.model}`}
              />
              <h3>{car.year} {car.make} {car.model}</h3>
              <p className="car-type">{car.type}</p>
              
              <div className="summary-details">
                <p><strong>Daily Rate:</strong> ${car.pricePerDay}</p>
                <p><strong>Insurance:</strong> ${bookingData.needsInsurance ? 50 : 0}/day</p>
                <p><strong>Rental Days:</strong> {days}</p>
              </div>

              <div className="summary-total">
                <h3>Total Cost</h3>
                <p className="total-amount">${totalCost}</p>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="booking-form-section">
            <form onSubmit={handleBooking}>
              <div className="form-section">
                <h3>Pickup Details</h3>
                
                <div className="form-group">
                  <label>Pickup Location*</label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={bookingData.pickupLocation}
                    onChange={handleInputChange}
                    placeholder="Enter pickup location"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pickup Date*</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={bookingData.pickupDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Dropoff Details</h3>

                <div className="form-group">
                  <label>Dropoff Location*</label>
                  <input
                    type="text"
                    name="dropoffLocation"
                    value={bookingData.dropoffLocation}
                    onChange={handleInputChange}
                    placeholder="Enter dropoff location"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Dropoff Date*</label>
                  <input
                    type="date"
                    name="dropoffDate"
                    value={bookingData.dropoffDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Insurance</h3>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="needsInsurance"
                    checked={bookingData.needsInsurance}
                    onChange={handleInputChange}
                  />
                  <span>Add Premium Insurance Coverage (+$50/day)</span>
                </label>
                <p className="insurance-note">
                  Includes collision damage waiver, theft protection, and 24/7 roadside assistance
                </p>
              </div>

              <div className="renter-info">
                <h3>Renter Information</h3>
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>License #:</strong> {user?.licenseNumber}</p>
              </div>

              <div className="form-section">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>I agree to the rental terms and conditions</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
