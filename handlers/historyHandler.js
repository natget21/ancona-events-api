import { getDBInstance } from '../db/dbSelector.js';
import { History } from '../models/mongodb/History.js';
import { Message } from '../models/mongodb/Message.js';

const collectionName = History


export const getHistoryById = async (req, res) => {
  const populate = { path: '_folder'};
  const history = await getDBInstance().getById(collectionName, req.params.id,populate);
  res.json(history);
};

export const getAllHistory = async (req, res) => {
  const populate = { path: '_folder'};
  const history = await getDBInstance().get(collectionName,{},{},{},populate);
  res.json(history);
};


export const getHistoryDetailById = async (req, res) => {
  
  const populate = [{ path: '_folder'}];
  const history = await getDBInstance().getById(collectionName, req.params.id,populate);
  const messages = await getDBInstance().get(Message,{"historyId":req.params.id});

  var historyObj = {};
  if(history!=null){
    historyObj = history?.toObject();  
    historyObj.messages = messages;
  }
  
  res.json(historyObj);
};


export const createHistory = async (req, res) => {
  const newHistory = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(newHistory);
};

export const updateHistory = async (req, res) => {
  const history = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(history);
};

export const deleteHistory = async (req, res) => {
  const response = await getDBInstance().delete(collectionName, req.params.id);
  res.status(204).send(response);
};
