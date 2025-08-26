import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';
import { User } from './User.js';
import { Venue } from './Venue.js';

const Coupon = sequelize.define('Coupon', {
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  venueId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Venue,
      key: 'id',
    },
  },
  validFrom: { type: DataTypes.DATE },
  validTo: { type: DataTypes.DATE },
  used: { type: DataTypes.BOOLEAN, defaultValue: false },
  usedAt: { type: DataTypes.DATE },
  discount: { type: DataTypes.FLOAT, allowNull: false },
  type: { type: DataTypes.ENUM("Percentage", "Fixed"), allowNull: false },
}, {
  timestamps: true, // same as MongoDB schema
  createdAt: true,
  updatedAt: true,
  version: false,   // equivalent to versionKey: false
});

// Optional: Add redeem logic as a static method
Coupon.redeem = async function (couponCode, userId, AttendanceModel) {
  const coupon = await Coupon.findOne({ where: { code: couponCode, userId } });
  if (!coupon) throw new Error('Coupon not found or not assigned to user');
  if (coupon.used) throw new Error('Coupon already redeemed');
  if (coupon.validFrom && new Date() < coupon.validFrom) throw new Error('Coupon not yet valid');
  if (coupon.validTo && new Date() > coupon.validTo) throw new Error('Coupon expired');

  coupon.used = true;
  coupon.usedAt = new Date();
  await coupon.save();

  const attendance = await AttendanceModel.create({
    userId,
    venueId: coupon.venueId,
    status: 'in',
  });

  return { coupon, attendance };
};

export { Coupon };
