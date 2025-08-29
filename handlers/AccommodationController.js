import { getDBInstance } from '../db/dbSelector.js';

const db = await getDBInstance();
const collectionName = "Accommodation"

export const getAccommodationById = async (req, res) => {
  const response = await db.getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllAccommodations = async (req, res) => {
  const response = await db.get(collectionName);
  res.json(response);
};

export const createAccommodation = async (req, res) => {
  const response = await db.create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateAccommodation = async (req, res) => {
  const response = await db.update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteAccommodation = async (req, res) => {
  const response = await db.remove(collectionName, req.params.id);
  res.status(204).send(response);
};