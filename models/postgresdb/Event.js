import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';
import { Venue } from './Venue.js';
import { Program } from './Program.js';

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: { type: DataTypes.TEXT },
  coverPicture: { type: DataTypes.STRING },
  venueId: {
    type: DataTypes.INTEGER,
    references: {
      model: Venue,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  startDateTime: { type: DataTypes.DATE },
  endDateTime: { type: DataTypes.DATE },
  maxAttendees: { type: DataTypes.INTEGER },
  tags: { type: DataTypes.ARRAY(DataTypes.STRING) }, // metaData.tags
  dressCode: { type: DataTypes.STRING },             // metaData.dressCode
}, {
  timestamps: true,   // createdAt, updatedAt
  version: false,     // equivalent to versionKey: false
});

// Associations

// Event belongs to Venue
Event.belongsTo(Venue, { foreignKey: 'venueId' });
Venue.hasMany(Event, { foreignKey: 'venueId' });

// Event has many Programs (many-to-many relationship)
const EventProgram = sequelize.define('EventProgram', {}, { timestamps: false });
Event.belongsToMany(Program, { through: EventProgram, foreignKey: 'eventId' });
Program.belongsToMany(Event, { through: EventProgram, foreignKey: 'programId' });

export { Event, EventProgram };
