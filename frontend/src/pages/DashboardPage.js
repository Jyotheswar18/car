import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DashboardPage.css';

const DashboardPage = ({ user }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/bookings/${bookingId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBookings();
    } catch (err) {
      alert('Failed to cancel booking');
    }
  };

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
  const pastBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : 
                          activeTab === 'past' ? pastBookings : cancelledBookings;

  if (loading) return <div className="loading">Loading your dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="container">
        {/* User Profile Section */}
        <section className="profile-section">
          <h1>My Dashboard</h1>
          <div className="user-card">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
              <p className="license">License: {user?.licenseNumber}</p>
            </div>
          </div>
        </section>

        {/* Bookings Section */}
        <section className="bookings-section">
          <h2>My Bookings</h2>

          {error && <div className="error-message">{error}</div>}

          {bookings.length === 0 ? (
            <div className="no-bookings">
              <p>You haven't made any bookings yet</p>
              <a href="/search" className="btn btn-primary">Browse Cars</a>
            </div>
          ) : (
            <>
              <div className="booking-tabs">
                <button
                  className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming ({upcomingBookings.length})
                </button>
                <button
                  className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
                  onClick={() => setActiveTab('past')}
                >
                  Completed ({pastBookings.length})
                </button>
                <button
                  className={`tab-btn ${activeTab === 'cancelled' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cancelled')}
                >
                  Cancelled ({cancelledBookings.length})
                </button>
              </div>

              {displayBookings.length === 0 ? (
                <p className="no-results-message">No {activeTab} bookings</p>
              ) : (
                <div className="bookings-grid">
                  {displayBookings.map(booking => (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-header">
                        <h3>{booking.carDetails.year} {booking.carDetails.make} {booking.carDetails.model}</h3>
                        <span className={`status-badge status-${booking.status}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>

                      <div className="booking-dates">
                        <div className="date-item">
                          <label>Pickup</label>
                          <p>{new Date(booking.pickupDate).toLocaleDateString()}</p>
                          <p className="location">{booking.pickupLocation}</p>
                        </div>
                        <div className="arrow">→</div>
                        <div className="date-item">
                          <label>Dropoff</label>
                          <p>{new Date(booking.dropoffDate).toLocaleDateString()}</p>
                          <p className="location">{booking.dropoffLocation}</p>
                        </div>
                      </div>

                      <div className="booking-details">
                        <p><strong>Days:</strong> {booking.days}</p>
                        <p><strong>Daily Rate:</strong> ${booking.dailyRate}</p>
                        <p><strong>Insurance:</strong> {booking.needsInsurance ? 'Yes' : 'No'}</p>
                      </div>

                      <div className="booking-footer">
                        <p className="total">
                          <strong>Total: ${booking.totalCost}</strong>
                        </p>
                        <p className={`payment-status payment-${booking.paymentStatus}`}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </p>
                      </div>

                      <div className="booking-actions">
                        {(booking.status === 'pending' || booking.status === 'confirmed') && (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </button>
                        )}
                        <a href={`/booking/${booking.carDetails.id}`} className="btn btn-secondary">
                          View Details
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
