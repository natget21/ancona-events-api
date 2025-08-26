import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';

const Venue = sequelize.define('Venue', {
  name: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  capacity: { type: DataTypes.INTEGER },
  description: { type: DataTypes.TEXT },
  coverPicture: { type: DataTypes.STRING },
  contactNumber: { type: DataTypes.STRING },
  openingHours: { type: DataTypes.STRING },
  geoLat: { type: DataTypes.FLOAT },
  geoLng: { type: DataTypes.FLOAT },
  type: {
    type: DataTypes.ENUM('conference', 'bar', 'restaurant', 'hotel', 'other')
  },
}, {
  timestamps: true,  // createdAt and updatedAt
  version: false,    // equivalent to versionKey: false
});

export { Venue };
