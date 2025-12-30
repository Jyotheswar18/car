# 🚀 Quick Start Guide

## One-Click Setup (Windows)

### Option 1: Manual Setup (Recommended for First Time)

#### Step 1: Start the Backend Server
```bash
cd C:\Users\Jyothiswar Reddy\OneDrive\Desktop\agile\car-rental-system\backend
npm install
npm start
```

Wait for: `🚗 Car Rental API running on http://localhost:5000`

#### Step 2: Start the Frontend (New Terminal)
```bash
cd C:\Users\Jyothiswar Reddy\OneDrive\Desktop\agile\car-rental-system\frontend
npm install
npm start
```

Wait for: Application opens at `http://localhost:3000`

### Option 2: Batch Scripts

Create `start-backend.bat` in the backend folder:
```batch
@echo off
npm install
npm start
pause
```

Create `start-frontend.bat` in the frontend folder:
```batch
@echo off
npm install
npm start
pause
```

Run both batch files to start the application.

## 📋 Verify Installation

1. **Backend Running?**
   - Open: http://localhost:5000/api/health
   - Should show: `{"status":"API is running"}`

2. **Frontend Running?**
   - Open: http://localhost:3000
   - Should load the CarRent homepage

## 🔐 Test Login

Use these credentials to login:
- **Email**: john@example.com
- **Password**: password123

Or register a new account.

## 🧪 Try These Features

1. **Search Cars**: Click "Search Cars" in navigation
2. **View Details**: Click on any car to see specifications
3. **Book a Car**: Select dates and insurance options
4. **Pay**: Use test card number ending in `1234` (e.g., 4111111111111234)
5. **Dashboard**: View your bookings and cancel if needed

## 💡 Sample Test Card Details

- **Card Number**: 4111111111111234
- **Cardholder**: John Doe
- **Expiry**: 12/25
- **CVV**: 123

## 🛑 Stop the Servers

- Press `Ctrl+C` in both terminal windows
- Or close the terminal windows

## 🔄 Restart from Scratch

```bash
# Delete dependencies (optional)
cd backend
rmdir /s node_modules
del package-lock.json

cd ../frontend
rmdir /s node_modules
del package-lock.json

# Start fresh
# Then follow Step 1 and 2 above
```

## 📱 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

## ⚡ Performance Tips

- First load takes 30-60 seconds (dependencies installing)
- Subsequent starts are much faster
- Clear browser cache if UI looks odd
- Use Ctrl+Shift+R for hard refresh

## 🆘 Common Issues

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
Solution: 
- Change port in backend `server.js` to 5001
- Update frontend proxy in `package.json`

### npm not found
```
Solution: Install Node.js from https://nodejs.org
```

### Dependencies Installing Forever
```
Solution: 
- Press Ctrl+C to cancel
- Run: npm cache clean --force
- Run: npm install again
```

## 🎉 You're All Set!

The application is now running. Enjoy exploring the car rental system!

For detailed documentation, see `README.md` in the project root.
