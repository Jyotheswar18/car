import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    carType: '',
    minPrice: '',
    maxPrice: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get('/api/cars');
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (err) {
      setError('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let filtered = cars;

    if (currentFilters.carType) {
      filtered = filtered.filter(car => car.type === currentFilters.carType);
    }

    if (currentFilters.minPrice) {
      filtered = filtered.filter(car => car.pricePerDay >= parseFloat(currentFilters.minPrice));
    }

    if (currentFilters.maxPrice) {
      filtered = filtered.filter(car => car.pricePerDay <= parseFloat(currentFilters.maxPrice));
    }

    setFilteredCars(filtered);
  };

  if (loading) return <div className="loading">Loading cars...</div>;

  const carTypes = [...new Set(cars.map(car => car.type))];

  return (
    <div className="search-container">
      <div className="container">
        <h1>Available Cars</h1>

        <div className="search-layout">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <h3>Filters</h3>

            <div className="filter-group">
              <label>Car Type</label>
              <select
                name="carType"
                value={filters.carType}
                onChange={handleFilterChange}
              >
                <option value="">All Types</option>
                {carTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Min Price ($/day)</label>
              <input
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="0"
              />
            </div>

            <div className="filter-group">
              <label>Max Price ($/day)</label>
              <input
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="500"
              />
            </div>

            <button className="btn btn-secondary" onClick={() => {
              setFilters({ carType: '', minPrice: '', maxPrice: '' });
              setFilteredCars(cars);
            }}>
              Reset Filters
            </button>
          </aside>

          {/* Cars Grid */}
          <div className="cars-grid-section">
            {error && <div className="error-message">{error}</div>}

            {filteredCars.length === 0 ? (
              <div className="no-results">
                <p>No cars found matching your criteria</p>
              </div>
            ) : (
              <div className="cars-grid">
                {filteredCars.map(car => (
                  <div key={car.id} className="car-card">
                    <div className="car-image">
                      <img
                        src={`https://via.placeholder.com/300x200?text=${car.make}+${car.model}`}
                        alt={`${car.make} ${car.model}`}
                      />
                      {car.available && <span className="available-badge">Available</span>}
                    </div>
                    <div className="car-info">
                      <h3>{car.year} {car.make} {car.model}</h3>
                      <p className="car-type">{car.type}</p>
                      <p className="car-description">{car.description}</p>

                      <div className="car-specs">
                        <span>🔧 {car.transmission}</span>
                        <span>⛽ {car.fuelType}</span>
                        <span>👥 {car.seats}</span>
                      </div>

                      <div className="car-rating">
                        <span className="rating-stars">★★★★★</span>
                        <span className="rating-count">({car.reviews} reviews)</span>
                      </div>

                      <div className="car-footer">
                        <div className="price">
                          <span className="price-amount">${car.pricePerDay}</span>
                          <span className="price-period">/day</span>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/car/${car.id}`)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
