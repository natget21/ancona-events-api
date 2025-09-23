import { getDBInstance } from '../db/dbSelector.js';

const collectionName = "Report"

export const getReportById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllReports = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createReport = async (req, res) => {
  const response = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateReport = async (req, res) => {
  const response = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteReport = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};