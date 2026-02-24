const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
const fs = require('fs');
const path = require('path');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gymprodeals');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedData = async () => {
    await connectDB();

    try {
        // Clear DB
        await User.deleteMany();
        await Product.deleteMany();

        console.log('Database Cleared');

        // Create Admin User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await User.create({
            username: 'admin',
            password: hashedPassword
        });
        console.log('Admin user created (admin / admin123)');

        // Seed initial products from data/products.json if exists
        const dataPath = path.join(__dirname, 'data', 'products.json');
        if (fs.existsSync(dataPath)) {
            const rawData = fs.readFileSync(dataPath, 'utf-8');
            const products = JSON.parse(rawData);

            for (const item of products) {
                await Product.create({
                    name: item.name,
                    image: item.image,
                    description: item.description,
                    amazonLink: item.amazonLink,
                    flipkartLink: item.flipkartLink,
                    healthkartLink: item.healthkartLink,
                    category: item.category,
                    lastUpdated: item.lastUpdated,
                    clicks: 0
                });
            }
            console.log('Products imported from JSON');
        }

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
