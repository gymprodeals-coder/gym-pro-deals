const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./config/db');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const redirectRoutes = require('./routes/redirect');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:3000'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

// Check DB Connection
pool.getConnection()
    .then((connection) => {
        console.log('MySQL connected successfully');
        connection.release();
    })
    .catch((err) => {
        console.error('MySQL connection error:', err);
    });

// Routes
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/redirect', redirectRoutes);

// Base route
app.get('/', (req, res) => {
    res.send('GymProDeals Backend API is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
