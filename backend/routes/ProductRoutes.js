const express = require('express')
const router = express.Router()
const { getProducts, createProducts, updateProduct, deleteProduct } = require('../controllers/ProductController')

router.get('/products/', getProducts);
router.post('/products/', createProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
module.exports = router;