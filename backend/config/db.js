const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gymprodeals');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Let it continue without exiting if it's running locally and DB is down
        // It helps during development. For production it should exit, or handle gracefully.
    }
};

module.exports = connectDB;
