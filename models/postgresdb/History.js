import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';

import { Folder } from './Folder.js';  // Assuming the Folder model exists in models/postgresql/Folder.js
import { Message } from './Message.js';  // Assuming the Message model exists in models/postgresql/Message.js

const History = sequelize.define('History', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  folderId: {
    type: DataTypes.INTEGER,  // Use the appropriate type for the folderId foreign key
    references: {
      model: Folder,  // Assuming Folder model is properly defined
      key: 'id'
    },
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  timestamps: true,  // Optional if you want createdAt/updatedAt fields
});

// Define the many-to-many or one-to-many relationship with Message
History.belongsToMany(Message, { through: 'HistoryMessages', foreignKey: 'historyId' });
Message.belongsToMany(History, { through: 'HistoryMessages', foreignKey: 'messageId' });

export { History };
