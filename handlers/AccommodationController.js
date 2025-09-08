import { getDBInstance } from '../db/dbSelector.js';

const collectionName = "Accommodation"
const userCollectionName = "User"

export const getAccommodationById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllAccommodations = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createAccommodation = async (req, res) => {
  const response = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateAccommodation = async (req, res) => {
  const response = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteAccommodation = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};

export const findMyAccommodation = async (req, res) => {

  
  const user = await getDBInstance().getById(userCollectionName, req.id);
  
  if(user==null){
    return res.status(404).json({ message: "User not found" });
  }
  
  if(user?.metaData?.accommodationDetail?.accommodationId==null){
    return res.status(404).json({ message: "Accommodation not found" });
  }

  const accommodationId = user.metaData.accommodationDetail.accommodationId

  const accommodation = await getDBInstance().getById(collectionName, accommodationId,["venue"]);

  res.status(200).send(accommodation);
};