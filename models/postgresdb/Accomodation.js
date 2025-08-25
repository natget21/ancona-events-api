import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';
import { Venue } from './Venue.js'; // make sure this path is correct

const Accommodation = sequelize.define('Accommodation', {
  name: { type: DataTypes.STRING, allowNull: false },
  venueId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Venue, // points to the Venue model
      key: 'id',    // references the 'id' column in Venue
    },
  },
  checkIn: { type: DataTypes.DATE },
  checkOut: { type: DataTypes.DATE },
  services: { type: DataTypes.ARRAY(DataTypes.STRING) },
  capacity: { type: DataTypes.INTEGER },
  parkingAvailable: { type: DataTypes.BOOLEAN },
  parkingDetails: { type: DataTypes.STRING },
  parkingPaymentMethod: { type: DataTypes.STRING },
  checkInProcedure: { type: DataTypes.TEXT },
  checkoutProcedure: { type: DataTypes.TEXT },
  layoutMap: { type: DataTypes.STRING },
  regulations: { type: DataTypes.TEXT },
  contactPhone: { type: DataTypes.STRING },
  contactEmail: { type: DataTypes.STRING },
}, {
  timestamps: false,
});

export { Accommodation };
