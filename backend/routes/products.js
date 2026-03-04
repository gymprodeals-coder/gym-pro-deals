const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../controllers/authController');

router.get('/', productController.getProducts);
router.get('/:slug', productController.getProductBySlug);
router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.updateProduct);
router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
