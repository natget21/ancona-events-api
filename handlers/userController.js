import { getDBInstance } from '../db/dbSelector.js';

const db = await getDBInstance();
const collectionName = "User"

export const getUserById = async (req, res) => {
  const response = await db.getById(collectionName, req.params.id);
  res.json(response);
};

export const getUsersByRole = async (req, res) => {
  const response = await db.get(collectionName, { role: req.params.role });
  res.json(response);
};

export const getAllUsers = async (req, res) => {
  const response = await db.get(collectionName);
  res.json(response);
};

export const createUser = async (req, res) => {
  const response = await db.create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateUser = async (req, res) => {
  const response = await db.update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteUser = async (req, res) => {
  const response = await db.remove(collectionName, req.params.id);
  res.status(204).send(response);
};