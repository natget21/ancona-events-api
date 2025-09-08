import { getDBInstance } from '../db/dbSelector.js';

const collectionName = "Transportation"

export const getTransportationById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllTransportation = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createTransportation = async (req, res) => {
  const response = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateTransportation = async (req, res) => {
  const response = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteTransportation = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};