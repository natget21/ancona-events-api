import { getDBInstance  } from '../db/dbSelector.js';

const collectionName = "Venue"

export const getVenueById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllVenues = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createVenue = async (req, res) => {
  console.log(db,"db");
  const response = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(response);
};


export const updateVenue = async (req, res) => {
  const response = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteVenue = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};

export const findVenues = async (req, res) => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const venues = await getDBInstance().get(collectionName, filter);

    const formatted = venues.map((v, index) => ({
      _id: v._id,
      name: v.name,
      address: v.address || null,
      city: v.city || null,
      capacity: v.capacity || null,
      description: v.description || null,
      coverPicture: v.coverPicture || null,
      contactNumber: v.contactNumber || null,
      openingHours: v.openingHours || null,
      geo: v.geo || null,
      type: v.type
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};