import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';
import { User } from './User.js';

const Trip = sequelize.define('Trip', {
    title: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    itinerary: { type: DataTypes.TEXT },
    meetingPoints: { type: DataTypes.ARRAY(DataTypes.STRING) },
    coverPicture: { type: DataTypes.STRING },
    startTime: { type: DataTypes.DATE },
    endTime: { type: DataTypes.DATE },
    priceAdult: { type: DataTypes.FLOAT },
    priceChild: { type: DataTypes.FLOAT },
    difficultyLevel: { type: DataTypes.ENUM('easy', 'moderate', 'hard') },
    includes: { type: DataTypes.ARRAY(DataTypes.STRING) },
    excludes: { type: DataTypes.ARRAY(DataTypes.STRING) },
}, {
    timestamps: false,
});

// Many-to-Many relationship for participants
const TripParticipant = sequelize.define('TripParticipant', {}, { timestamps: false });

Trip.belongsToMany(User, { through: TripParticipant, foreignKey: 'tripId' });
User.belongsToMany(Trip, { through: TripParticipant, foreignKey: 'userId' });

export { Trip, TripParticipant };
