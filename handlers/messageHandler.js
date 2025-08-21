import { getDBInstance } from '../db/dbSelector.js';
import { Message } from '../models/mongodb/Message.js';
import { History } from '../models/mongodb/History.js';

const collectionName = Message


export const getMessageById = async (req, res) => {
  const messages = await getDBInstance().getById(collectionName, req.params.id);
  res.json(messages);
};

export const getMessages = async (req, res) => {
  const messages = await getDBInstance().get(collectionName)
  res.json(messages);
};


export const getSavedMessagesOfUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userHistory = await getDBInstance().get(History, { userId: userId });
    if (!userHistory.length) {
      return res.status(404).json({ message: "No history found for this user." });
    }
    const historyIds = userHistory.map(history => history._id);
    const savedMessages = await getDBInstance().get(Message, {
      historyId: { $in: historyIds },
      saved: true
    });

    res.json(savedMessages);
  } catch (error) {
    console.error("Error fetching saved messages:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const createMessage = async (req, res) => {
  const newMessage = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(newMessage);
};

export const updateMessage = async (req, res) => {
  const message = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(message);
};

export const deleteMessage = async (req, res) => {
  const response = await getDBInstance().delete(collectionName, req.params.id);
  res.status(204).send(response);
};
