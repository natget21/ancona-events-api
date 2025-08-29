import { getDBInstance } from '../db/dbSelector.js';

const db = await getDBInstance();
const collectionName = "Coupon"

export const getCouponById = async (req, res) => {
  const response = await db.getById(collectionName, req.params.id);
  res.json(response);
};

export const getAllCoupons = async (req, res) => {
  const response = await db.get(collectionName);
  res.json(response);
};

export const createCoupon = async (req, res) => {
  const response = await db.create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateCoupon = async (req, res) => {
  const response = await db.update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteCoupon = async (req, res) => {
  const response = await db.remove(collectionName, req.params.id);
  res.status(204).send(response);
};