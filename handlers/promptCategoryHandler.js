import { PromptCategory } from '../models/mongodb/PromptCategory.js';
import {  getDBInstance } from '../db/dbSelector.js';


const collectionName = PromptCategory

export const getPromptCategoryById = async (req, res) => {
  const populate = { path: '_prompts', select: '_id title description' };
  const category = await getDBInstance().getById(collectionName, req.params.id,populate);
  res.json(category);
};

export const getPromptCategories = async (req, res) => {
  const populate = { path: '_prompts', select: '_id title description' };
  const categories = await getDBInstance().get(collectionName,{},{},{},populate);
  res.json(categories);
};

export const createPromptCategory = async (req, res) => {
  const newCategory = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(newCategory);
};

export const updatePromptCategory = async (req, res) => {
  const category = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(category);
};

export const deletePromptCategory = async (req, res) => {
  const response = await getDBInstance().delete(collectionName, req.params.id);
  res.status(204).send(response);
};
