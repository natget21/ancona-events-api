import { getDBInstance } from '../db/dbSelector.js';

const db = await getDBInstance();
const collectionName = "Social"

export const getSocialById = async (req, res) => {
  const response = await db.getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllSocials = async (req, res) => {
  const response = await db.get(collectionName);
  res.json(response);
};

export const createSocial = async (req, res) => {
  const response = await db.create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateSocial = async (req, res) => {
  const response = await db.update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteSocial = async (req, res) => {
  const response = await db.remove(collectionName, req.params.id);
  res.status(204).send(response);
};