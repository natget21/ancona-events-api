import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';
import { Event } from './Event.js';

const Transportation = sequelize.define('Transportation', {
  type: {
    type: DataTypes.ENUM('bus', 'shuttle', 'ship', 'car', 'other'),
    allowNull: false
  },
  route: { type: DataTypes.STRING },
  timetable: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
  availability: { type: DataTypes.INTEGER },
  eventId: {
    type: DataTypes.INTEGER,
    references: {
      model: Event,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
}, {
  timestamps: false,
});

Transportation.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasMany(Transportation, { foreignKey: 'eventId' });

export { Transportation };
