import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';

const Message = sequelize.define('Message', {
  type: {
    type: DataTypes.ENUM('prompt', 'bot', 'user'),
    allowNull: false
  },
  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  promptId: {
    type: DataTypes.INTEGER,
    allowNull: true // Nullable for prompts
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  saved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false,  // We are manually handling the timestamp field
});

export { Message };
