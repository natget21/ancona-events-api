import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';

const Products = sequelize.define('Products', {
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
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    imageUrl:{
        type: DataTypes.STRING,
        allowNull: true
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false,  // We are manually handling the timestamp if needed
});

export { Products };
