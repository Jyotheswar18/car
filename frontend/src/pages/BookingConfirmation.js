import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookingConfirmation.css';

const BookingConfirmation = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [processing, setProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  const fetchBookingDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooking(response.data);
    } catch (err) {
      setError('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/payments',
        {
          bookingId: id,
          amount: booking.totalCost,
          paymentMethod: 'card',
          cardDetails: {
            number: paymentData.cardNumber,
            name: paymentData.cardName
          }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.payment.status === 'completed') {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('failed');
      }
    } catch (err) {
      setPaymentStatus('failed');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="loading">Loading booking details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!booking) return <div className="error-message">Booking not found</div>;

  if (paymentStatus === 'success') {
    return (
      <div className="confirmation-container">
        <div className="success-screen">
          <div className="success-icon">✓</div>
          <h1>Booking Confirmed!</h1>
          <p>Your car rental has been successfully booked.</p>

          <div className="confirmation-details">
            <h2>Booking Reference: <span>{booking.id}</span></h2>

            <div className="detail-card">
              <h3>{booking.carDetails.year} {booking.carDetails.make} {booking.carDetails.model}</h3>
              <p className="booking-date">
                {new Date(booking.pickupDate).toLocaleDateString()} → {new Date(booking.dropoffDate).toLocaleDateString()}
              </p>
              <p className="booking-location">
                {booking.pickupLocation} → {booking.dropoffLocation}
              </p>
              <p className="booking-cost">Total: <strong>${booking.totalCost}</strong></p>
            </div>

            <div className="confirmation-message">
              <p>A confirmation email has been sent to your registered email address.</p>
              <p>Please arrive 15 minutes early for pickup.</p>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                View My Bookings
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="container">
        <h1>Complete Payment</h1>

        <div className="payment-layout">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-card">
              <div className="car-info">
                <h3>{booking.carDetails.year} {booking.carDetails.make} {booking.carDetails.model}</h3>
                <p className="text-muted">Rental Duration: {booking.days} days</p>
              </div>

              <div className="summary-row">
                <span>Daily Rate (${booking.dailyRate} × {booking.days} days)</span>
                <span>${booking.dailyRate * booking.days}</span>
              </div>

              {booking.needsInsurance && (
                <div className="summary-row">
                  <span>Insurance ($50 × {booking.days} days)</span>
                  <span>${50 * booking.days}</span>
                </div>
              )}

              <div className="summary-row total">
                <span>Total Amount</span>
                <span>${booking.totalCost}</span>
              </div>
            </div>

            <div className="rental-info">
              <h3>Rental Details</h3>
              <p><strong>Pickup:</strong> {new Date(booking.pickupDate).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {booking.pickupLocation}</p>
              <p><strong>Dropoff:</strong> {new Date(booking.dropoffDate).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {booking.dropoffLocation}</p>
            </div>
          </div>

          {/* Payment Form */}
          <div className="payment-form-section">
            <h2>Payment Information</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handlePayment}>
              <div className="form-section">
                <h3>Card Details</h3>

                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    value={paymentData.cardName}
                    onChange={handlePaymentChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 1234"
                    maxLength="16"
                    required
                  />
                  <p className="test-note">Test: Use any number ending in 1234</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handlePaymentChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      maxLength="3"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary pay-btn" disabled={processing}>
                {processing ? 'Processing...' : `Pay $${booking.totalCost}`}
              </button>

              {paymentStatus === 'failed' && (
                <div className="error-message">
                  Payment failed. Please try again or use a different card.
                </div>
              )}
            </form>

            <div className="payment-security">
              <p>🔒 Your payment information is secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
