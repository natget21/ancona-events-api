const config = require('../config/config');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: config.CLOUDINARY.CLOUD_NAME,
  api_key: config.CLOUDINARY.API_KEY,
  api_secret: config.CLOUDINARY.API_SECRET,
});

const uploadToCloudinary = async (filePath, folder = 'uploads') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
      folder,
    });
    return result.secure_url;
  } catch (err) {
    throw new Error('Cloudinary upload failed: ' + err.message);
  }
};

module.exports = { uploadToCloudinary };
