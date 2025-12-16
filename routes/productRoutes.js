import express from 'express';

import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);
router.put('/', updateProduct);
router.delete('/', deleteProduct);

export default router;