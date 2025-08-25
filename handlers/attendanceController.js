import { getDBInstance  } from '../db/dbSelector.js';

const db = getDBInstance();

const collectionName = "Attendance"

export const getAttendanceById = async (req, res) => {
  const response = await db.getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllAttendances = async (req, res) => {
  const response = await db.get(collectionName);
  res.json(response);
};

export const createAttendance = async (req, res) => {
  const response = await db.create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateAttendance = async (req, res) => {
  const response = await db.update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteAttendance = async (req, res) => {
  const response = await db.remove(collectionName, req.params.id);
  res.status(204).send(response);
};
