import { getDBInstance  } from '../db/dbSelector.js';

const db = getDBInstance();
const collectionName = "Program"

export const getProgramById = async (req, res) => {
  const response = await db.getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllPrograms = async (req, res) => {
  const response = await db.get(collectionName);
  res.json(response);
};

export const createProgram = async (req, res) => {
  const response = await db.create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateProgram = async (req, res) => {
  const response = await db.update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteProgram = async (req, res) => {
  const response = await db.remove(collectionName, req.params.id);
  res.status(204).send(response);
};