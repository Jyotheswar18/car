# CarRent - Professional Car Rental Booking System

A modern, professional car rental booking system built with React and Node.js/Express. Features include vehicle browsing, advanced filtering, user authentication, real-time booking management, and secure payment processing.

## 🚀 Features

- **Car Browse & Search**: Filter by type, price range, and availability
- **User Authentication**: Secure registration and login with JWT
- **Booking System**: Easy-to-use booking with date selection and insurance options
- **Payment Processing**: Secure mock payment system
- **User Dashboard**: View and manage all bookings
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Professional UI**: Modern, clean interface inspired by industry leaders
- **Real-time Updates**: Instant booking confirmation and status updates

## 📋 Project Structure

```
car-rental-system/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── cars.js          # Car catalog endpoints
│   │   ├── bookings.js      # Booking management
│   │   ├── users.js         # User profile management
│   │   └── payments.js      # Payment processing
│   ├── middleware/
│   │   └── authenticate.js  # JWT authentication middleware
│   ├── utils/
│   │   └── auth.js          # Auth utilities (JWT, password hashing)
│   ├── data/
│   │   └── mockData.js      # Mock database with sample data
│   ├── server.js            # Express server entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navigation.js # Top navigation bar
    │   │   └── Footer.js     # Footer component
    │   ├── pages/
    │   │   ├── HomePage.js              # Home page with hero section
    │   │   ├── SearchPage.js            # Car search and filtering
    │   │   ├── CarDetailsPage.js        # Car specifications and details
    │   │   ├── BookingPage.js           # Booking form
    │   │   ├── BookingConfirmation.js   # Payment and confirmation
    │   │   ├── LoginPage.js             # User login
    │   │   ├── RegisterPage.js          # User registration
    │   │   └── DashboardPage.js         # User bookings dashboard
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Navigation.css
    │   │   ├── Footer.css
    │   │   ├── HomePage.css
    │   │   ├── SearchPage.css
    │   │   ├── CarDetailsPage.css
    │   │   ├── BookingPage.css
    │   │   ├── AuthPages.css
    │   │   ├── DashboardPage.css
    │   │   └── BookingConfirmation.css
    │   ├── App.js            # Main app component
    │   └── index.js           # React entry point
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd car-rental-system/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration (optional for demo):
   ```
   PORT=5000
   JWT_SECRET=your_secure_jwt_secret
   NODE_ENV=development
   ```

5. Start the backend server:
   ```bash
   npm run dev
   ```
   
   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
   ```bash
   cd car-rental-system/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## 🔐 Demo Credentials

Test the application with these credentials:

- **Email**: john@example.com
- **Password**: password123

Or create a new account through the registration page.

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### Cars
- `GET /api/cars` - Get all cars (with filters)
- `GET /api/cars/:id` - Get car details
- `GET /api/cars/types/list` - Get available car types

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Payments
- `POST /api/payments` - Process payment
- `GET /api/payments/:id` - Get payment details

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🎨 Design Features

- **Color Scheme**:
  - Primary: #003d82 (Dark Blue)
  - Secondary: #00a8e8 (Bright Blue)
  - Accent: #ffc400 (Gold)
  - Success: #4caf50 (Green)

- **Responsive Breakpoints**:
  - Desktop: 1200px+
  - Tablet: 768px - 1199px
  - Mobile: < 768px

- **Typography**:
  - Font Family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
  - Sizes: 12px - 48px
  - Weights: 400, 500, 600, 700

## 🧪 Testing the Application

### Complete User Flow
1. **Home Page**: Browse features and search bar
2. **Search**: Filter and view available cars
3. **Car Details**: View specifications and amenities
4. **Registration**: Create a new account
5. **Booking**: Select dates and insurance
6. **Payment**: Complete payment with test card
7. **Dashboard**: View and manage bookings
8. **Cancel**: Cancel a booking if needed

### Test Card Numbers
- Valid card: Any number ending in `1234`
- Example: `4111111111111234`

## 🚀 Deployment

### Backend (Node.js)
- Can be deployed to Heroku, AWS, DigitalOcean, or any Node.js hosting
- Requires: Node.js runtime, environment variables
- Database: Ready to integrate MongoDB or PostgreSQL

### Frontend (React)
- Build for production: `npm run build`
- Deploy to Vercel, Netlify, AWS S3 + CloudFront, or GitHub Pages
- Update API endpoint in code before deployment

## 📦 Technologies Used

### Backend
- Express.js - Web framework
- JWT - Authentication
- bcryptjs - Password hashing
- dotenv - Environment variables
- CORS - Cross-origin requests

### Frontend
- React 18 - UI framework
- React Router DOM - Navigation
- Axios - HTTP client
- CSS3 - Styling

## 🔧 Configuration

### Environment Variables (Backend)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/car_rental
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

## 📚 API Response Examples

### Login Response
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "1",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "licenseNumber": "DL123456"
  }
}
```

### Booking Response
```json
{
  "message": "Booking created successfully",
  "booking": {
    "id": "BK1234567890",
    "carId": "C1",
    "pickupDate": "2024-01-20T00:00:00.000Z",
    "dropoffDate": "2024-01-25T00:00:00.000Z",
    "days": 5,
    "totalCost": 325,
    "status": "pending",
    "paymentStatus": "unpaid"
  }
}
```

## 🐛 Troubleshooting

### Backend issues
- Port already in use: Change `PORT` in `.env` file
- Dependencies not installing: Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Frontend issues
- CORS errors: Ensure backend is running on `http://localhost:5000`
- Page not loading: Clear browser cache and hard reload (Ctrl+Shift+R)

## 📝 Future Enhancements

- [ ] Real MongoDB integration
- [ ] Email verification
- [ ] Admin dashboard
- [ ] Review and ratings system
- [ ] Multiple payment gateways (Stripe, PayPal)
- [ ] Vehicle tracking and GPS
- [ ] Insurance claims management
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Advanced filtering (transmission, fuel type, etc.)

## 📄 License

This project is provided as-is for educational and commercial use.

## 👨‍💻 Support

For issues or questions, please refer to the project documentation or create an issue in the repository.

## 🎉 Ready to Get Started?

The application is fully functional and ready to use. Start the backend and frontend servers, then open your browser to `http://localhost:3000` to begin!

---

Built with ❤️ for car rental businesses worldwide.
