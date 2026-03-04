const pool = require('../config/db');

const mapToMongoRes = (row) => ({ ...row, _id: row.id.toString() });

exports.getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products ORDER BY createdAt DESC');
        res.json(rows.map(mapToMongoRes));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductBySlug = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products WHERE slug = ?', [req.params.slug]);
        if (rows.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.json(mapToMongoRes(rows[0]));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, slug, image, description, category, amazonLink, flipkartLink, healthkartLink, price } = req.body;
        const [result] = await pool.query(
            `INSERT INTO products (name, slug, image, description, category, amazonLink, flipkartLink, healthkartLink, price) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, slug, image, description, category, amazonLink || null, flipkartLink || null, healthkartLink || null, price]
        );
        res.status(201).json({ ...req.body, _id: result.insertId.toString(), clicks: 0 });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, slug, image, description, category, amazonLink, flipkartLink, healthkartLink, price } = req.body;
        const [result] = await pool.query(
            `UPDATE products SET name = ?, slug = ?, image = ?, description = ?, category = ?, amazonLink = ?, flipkartLink = ?, healthkartLink = ?, price = ? WHERE id = ?`,
            [name, slug, image, description, category, amazonLink || null, flipkartLink || null, healthkartLink || null, price, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });

        const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        res.json(mapToMongoRes(rows[0]));
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
