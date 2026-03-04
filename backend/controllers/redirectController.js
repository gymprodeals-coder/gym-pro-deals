const pool = require('../config/db');

exports.redirectStore = async (req, res) => {
    try {
        const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (products.length === 0) return res.status(404).send('Product not found');

        const product = products[0];
        const store = req.params.store;
        let link = '';

        if (store === 'amazon') link = product.amazonLink;
        else if (store === 'flipkart') link = product.flipkartLink;
        else if (store === 'healthkart') link = product.healthkartLink;

        if (!link) return res.status(404).send('Store link not found');

        // Increment clicks
        await pool.query('UPDATE products SET clicks = clicks + 1 WHERE id = ?', [req.params.id]);

        // Log click
        await pool.query('INSERT INTO click_logs (productId, store) VALUES (?, ?)', [req.params.id, store]);

        res.redirect(link);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
