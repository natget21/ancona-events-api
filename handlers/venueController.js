import { getDBInstance  } from '../db/dbSelector.js';

const db = getDBInstance();
const collectionName = "Venue"

export const getVenueById = async (req, res) => {
  const response = await db.getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllVenues = async (req, res) => {
  const response = await db.get(collectionName);
  res.json(response);
};

export const createVenue = async (req, res) => {
  const response = await db.create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateVenue = async (req, res) => {
  const response = await db.update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteVenue = async (req, res) => {
  const response = await db.remove(collectionName, req.params.id);
  res.status(204).send(response);
};