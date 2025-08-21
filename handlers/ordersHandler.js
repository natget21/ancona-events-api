import { Orders } from '../models/mongodb/Orders.js';
import { getDBInstance } from '../db/dbSelector.js';
import { Products } from '../models/mongodb/Products.js';
import { Prompt } from '../models/mongodb/Prompt.js';

const collectionName = Orders


export const getOrderById = async (req, res) => {
    try {
        const order = await getDBInstance().getById(collectionName, req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const productItems = order.items.filter(item => item.type === 'product').map(item => item._id);
        const promptItems = order.items.filter(item => item.type === 'prompt').map(item => item._id);

        const populatedProducts = await getDBInstance().get(Products, { _id: { $in: productItems } });
        const populatedPrompts = await getDBInstance().get(Prompt, { _id: { $in: promptItems } });

        order._items = [...populatedProducts, ...populatedPrompts];

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await getDBInstance().get(collectionName);

        for (let order of orders) {
            const productItems = order.items.filter(item => item.type === 'product').map(item => item._id);
            const promptItems = order.items.filter(item => item.type === 'prompt').map(item => item._id);

            const populatedProducts = await getDBInstance().get(Products, { _id: { $in: productItems } });
            const populatedPrompts = await getDBInstance().get(Prompt, { _id: { $in: promptItems } });
            order._items = [...populatedProducts, ...populatedPrompts];

        }
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createOrder = async (req, res) => {
    const newOrder = await getDBInstance().create(collectionName, req.body);
    res.status(201).json(newOrder);
};

export const updateOrder = async (req, res) => {
    const order = await getDBInstance().update(collectionName, req.params.id, req.body);
    res.json(order);
};

export const deleteOrder = async (req, res) => {
    const response = await getDBInstance().delete(collectionName, req.params.id);
    res.status(204).send(response);
};
