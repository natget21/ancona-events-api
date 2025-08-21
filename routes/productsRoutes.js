import express from 'express';
import { getProductById,getProducts, createProduct, updateProduct, deleteProduct } from '../handlers/productsHandler.js';

const router = express.Router();

router.get('/:id', getProductById);
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;