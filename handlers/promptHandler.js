import { getDBInstance } from '../db/dbSelector.js';
import { Prompt } from '../models/mongodb/Prompt.js';

const collectionName = Prompt

export const getPromptById = async (req, res) => {
  const prompt = await getDBInstance().getById(collectionName, req.params.id);
  res.json(prompt);
};

export const getPrompts = async (req, res) => {
  const prompts = await await getDBInstance().get(collectionName);
  res.json(prompts);
};

export const getPromptsByMarketStatus = async (req, res) => {
  try {
    const { isOnMarket } = req.query;

    if (isOnMarket === undefined) {
      return res.status(400).json({ message: "Missing 'isOnMarket' query parameter" });
    }

    const isOnMarketBool = isOnMarket === 'true';

    const filter = { isOnMarket: isOnMarketBool };
    const prompts = await await getDBInstance().get(collectionName, filter);
    res.json(prompts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPrompt = async (req, res) => {
  const newPrompt = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(newPrompt);
};

export const updatePrompt = async (req, res) => {
  const prompt = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(prompt);
};

export const deletePrompt = async (req, res) => {
  const response = await getDBInstance().delete(collectionName, req.params.id);
  res.status(204).send(response);
};
