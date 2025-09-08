import { getDBInstance  } from '../db/dbSelector.js';

const collectionName = "User"

export const getUserById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getUsersByRole = async (req, res) => {
  const response = await getDBInstance().get(collectionName, {role: req.params.role});
  res.json(response);
};

export const getAllUsers = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createUser = async (req, res) => {
  const response = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateUser = async (req, res) => {
  const response = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteUser = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};

export const assignAccommodationToUser = async (req, res) => {
  const data = req.body;

  const accommodationDetail = {accommodationId: data.accommodationId, roomNumber: data.roomNumber};

  const updateData = {"metaData.accommodationDetail": accommodationDetail}

  const response = await getDBInstance().update(collectionName, req.body.userId, updateData);
  res.json(response);
};