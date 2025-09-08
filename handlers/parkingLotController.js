import { getDBInstance  } from '../db/dbSelector.js';

const collectionName = "ParkingLot"

export const getParkingLotById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllParkingLots = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createParkingLot = async (req, res) => {
  const response = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateParkingLot = async (req, res) => {
  const response = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteParkingLot = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};

export const findParkingLots = async (req, res) => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const sort = req.query.sort ? req.query.sort : {};
    const limit = req.query.limit ? req.query.limit : null;

    const populate = ["location","program"]
    const parkingLots = await getDBInstance().get(collectionName, filter,null,{  sort: sort, limit: limit},populate);

    res.json(parkingLots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};