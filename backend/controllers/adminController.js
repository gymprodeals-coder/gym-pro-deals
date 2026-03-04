const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [admins] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
        if (admins.length === 0) return res.status(400).json({ message: 'Invalid email or password' });

        const admin = admins[0];
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ _id: admin.id.toString() }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, email: admin.email });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.setup = async (req, res) => {
    try {
        if (req.body.secret !== process.env.SETUP_SECRET) return res.status(403).json({ message: 'Forbidden' });
        const [existing] = await pool.query('SELECT * FROM admins LIMIT 1');
        if (existing.length > 0) return res.status(400).json({ message: 'Admin already setup' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await pool.query('INSERT INTO admins (email, password) VALUES (?, ?)', [req.body.email, hashedPassword]);

        res.json({ message: 'Admin created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.dashboard = async (req, res) => {
    try {
        const [productCountRes] = await pool.query('SELECT COUNT(*) as count FROM products');
        const totalProducts = productCountRes[0].count;

        const [clickSumRes] = await pool.query('SELECT SUM(clicks) as totalClicks FROM products');
        const totalClicks = clickSumRes[0].totalClicks || 0;

        const [topProductRes] = await pool.query('SELECT *, id AS _id FROM products ORDER BY clicks DESC LIMIT 1');
        const topProduct = topProductRes.length > 0 ? topProductRes[0] : null;

        res.json({ totalProducts, totalClicks, topProduct });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.verify = (req, res) => {
    res.json({ valid: true });
};
