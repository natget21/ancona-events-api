import { getDBInstance  } from '../db/dbSelector.js';

const collectionName = "Event"

export const getEventById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllEvents = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createEvent = async (req, res) => {
  const response = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateEvent = async (req, res) => {
  const response = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteEvent = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};

export const findEvents = async (req, res) => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const sort = req.query.sort ? req.query.sort : {};
    const limit = req.query.limit ? req.query.limit : null;

    const populate = ["location","program"]
    const events = await getDBInstance().get(collectionName, filter,null,{  sort: sort, limit: limit},populate);

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};