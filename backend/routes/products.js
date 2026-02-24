const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

// Public route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({}).sort({ updatedAt: -1 });
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching products' });
    }
});

// Protected route for stats
router.get('/stats', protect, async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const products = await Product.find({}, 'clicks');
        const totalClicks = products.reduce((acc, curr) => acc + (curr.clicks || 0), 0);
        res.json({ totalProducts, totalClicks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch stats' });
    }
});

// Protected route to create product
router.post('/', protect, async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create product' });
    }
});

// Protected route to update product
router.put('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update product' });
    }
});

// Protected route to delete product
router.delete('/:id', protect, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ id: req.params.id, message: 'Product removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
});


module.exports = router;
