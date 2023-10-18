const express = require('express');
const {getAllProducts, getProductById, addNewProduct, updateProductById, removeProductById, removeAllProducts
} = require("../services/productService");

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products', addNewProduct);
router.put('/products/:id', updateProductById);
router.delete('/products/:id', removeProductById);
router.delete('/products', removeAllProducts);

module.exports = router;
