const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    const { url, productId } = req.query;

    if (!url) {
        return res.status(400).send('Missing destination URL');
    }

    try {
        if (productId) {
            // Increment click count
            await Product.findByIdAndUpdate(productId, { $inc: { clicks: 1 } });
        }
    } catch (error) {
        console.error('Error tracking click:', error);
    }

    // Redirect to the external store link
    res.redirect(url);
});

module.exports = router;
