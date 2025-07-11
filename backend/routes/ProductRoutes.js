const express = require('express')
const router = express.Router()
const { getProducts, createProducts, updateProduct, deleteProduct, getSingleProduct } = require('../controllers/ProductController')

router.get('/products/', getProducts);
router.post('/products/', createProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products/:id', getSingleProduct)
module.exports = router;