const express = require('express');
const productController = require('../controllers/productcontroller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware.authenticate); // Middleware for authentication

router.get('/',productController.getAllProducts);
router.post('/',productController.createProduct);
router.put('/:id',productController.updateProduct);
router.delete('/:id',productController.deleteProduct);

module.exports = router;