import { getDBInstance  } from '../db/dbSelector.js';

const db = await getDBInstance();
const collectionName = "Event"

export const getEventById = async (req, res) => {
  const response = await db.getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllEvents = async (req, res) => {
  const response = await db.get(collectionName);
  res.json(response);
};

export const createEvent = async (req, res) => {
  const response = await db.create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateEvent = async (req, res) => {
  const response = await db.update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteEvent = async (req, res) => {
  const response = await db.remove(collectionName, req.params.id);
  res.status(204).send(response);
};