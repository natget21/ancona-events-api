import { getDBInstance } from '../db/dbSelector.js';
import Trip from '../models/mongodb/Trip.js';

const collectionName = "Trip"

export const getTripById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllTrips = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createTrip = async (req, res) => {
  try {
    if (req.body.participants) {
      req.body.participants = req.body.participants.map(p => p.id || p._id || p);
    }

    const trip = new Trip(req.body);
    const savedTrip = await trip.save();

    const populatedTrip = await Trip.findById(savedTrip._id)
      .populate('participants', 'firstName lastName email role')
      .exec();

    res.status(201).json(populatedTrip);
  } catch (err) {
    res.status(400).json({ message: 'Error creating trip', error: err.message });
  }
};

export const updateTrip = async (req, res) => {
  try {
    if (req.body.participants) {
      req.body.participants = req.body.participants.map(p => p.id || p._id || p);
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('participants', 'firstName lastName email role')
      .exec();

    if (!updatedTrip) return res.status(404).json({ message: 'Trip not found' });

    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json({ message: 'Error updating trip', error: err.message });
  }
};

export const deleteTrip = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};

export const findTrips = async (req, res) => {
  try {
    const filter = req.query.filter ? JSON.parse(req.query.filter) : {};
    const sort = req.query.sort ? req.query.sort : {};
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    const query = Trip.find(filter).populate('participants', 'firstName lastName email role');

    if (sort) query.sort(sort);
    if (limit) query.limit(limit);

    const trips = await query.exec();

    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Fetch a single trip by ID with participants populated
export const findTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('participants', 'firstName lastName email role')
      .exec();

    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};