import { getDBInstance  } from '../db/dbSelector.js';

const collectionName = "Notification"

export const getNotificationById = async (req, res) => {
  const response = await getDBInstance().getById(collectionName, req.params.id);
  res.json(response);
};

export const getNotificationByUserId = async (req, res) => {
  const response = await getDBInstance().get(collectionName, {userId: req.params.userId});
  res.json(response);
};

export const getAllNotifications = async (req, res) => {
  const response = await getDBInstance().get(collectionName);
  res.json(response);
};

export const createNotification = async (req, res) => {
  const response = await getDBInstance().create(collectionName, req.body);
  res.status(201).json(response);
};

export const updateNotification = async (req, res) => {
  const response = await getDBInstance().update(collectionName, req.params.id, req.body);
  res.json(response);
};

export const deleteNotification = async (req, res) => {
  const response = await getDBInstance().remove(collectionName, req.params.id);
  res.status(204).send(response);
};




// custom methods
export const markAllAsRead = async (req, res) => {
  const userId = req.params.userId;
  const notifications = await getDBInstance().get(collectionName, { userId: userId, seen: false });
  
  const updatePromises = notifications.map(notification => {
    console.log("not ",notification._id);
    return getDBInstance().update(collectionName, notification._id, { seen: true });
  });

  await Promise.all(updatePromises);
  
  res.status(200).json({ message: 'All notifications marked as read' });
};

export const markAsRead = async (req, res) => {
  const notificationId = req.params.id;
  const notification = await getDBInstance().update(collectionName, notificationId, { seen: true });
  
  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  res.status(200).json(notification);
}