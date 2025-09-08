import { getDBInstance  } from '../db/dbSelector.js';

const collectionName = "Attendance"

export const getAttendanceById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllAttendances = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createAttendance = async (req, res) => {
  const response = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateAttendance = async (req, res) => {
  const response = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteAttendance = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};
