import { Products } from '../models/mongodb/Products.js';
import { getDBInstance } from '../db/dbSelector.js';


const collectionName = Products

export const getProductById = async (req, res) => {
  const product = await getDBInstance().getById(collectionName, req.params.id);
  res.json(product);
};

export const getProducts = async (req, res) => {
  const products =  await getDBInstance().get(collectionName);
  res.json(products);
};

export const createProduct = async (req, res) => {
  const newProduct = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(newProduct);
};

export const updateProduct = async (req, res) => {
  const product = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const response = await getDBInstance().delete(collectionName, req.params.id);
  res.status(204).send(response);
};
