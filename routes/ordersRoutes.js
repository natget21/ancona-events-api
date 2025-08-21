import express from 'express';
import { getOrderById, getOrders, createOrder, updateOrder, deleteOrder } from '../handlers/ordersHandler.js';

const router = express.Router();

router.get('/:id', getOrderById);
router.get('/', getOrders);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;