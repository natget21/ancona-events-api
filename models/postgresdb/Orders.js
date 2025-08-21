import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';

const Orders = sequelize.define('Orders', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    items: {
        type: DataTypes.ARRAY,
        allowNull
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    timestamps: false,  // We are manually handling the timestamp if needed
});

export { Orders };
