import express from 'express';

import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

// public : See all products
router.get('/', getProducts);

// Protected : Add a product
router.post('/', verifyToken, addProduct);

// Protected : Update a product
router.put('/', verifyToken, updateProduct);

// Protected : Delete a product
router.delete('/', verifyToken, deleteProduct);

export default router;