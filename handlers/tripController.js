import { getDBInstance  } from '../db/dbSelector.js';

const db = getDBInstance();
const collectionName = "Trip"

export const getTripById = async (req, res) => {
  const response = await db.getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllTrips = async (req, res) => {
  const response = await db.get(collectionName);
  res.json(response);
};

export const createTrip = async (req, res) => {
  const response = await db.create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateTrip = async (req, res) => {
  const response = await db.update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteTrip = async (req, res) => {
  const response = await db.remove(collectionName, req.params.id);
  res.status(204).send(response);
};