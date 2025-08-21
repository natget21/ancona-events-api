import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';

const Prompt = sequelize.define('Prompt', {
  titleEn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titleIt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionEn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionIt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isOnMarket: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  timestamps: false,  // We are manually handling the timestamp if needed
});

export { Prompt };
