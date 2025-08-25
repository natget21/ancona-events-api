import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  validFrom: Date,
  validTo: Date,
  used: { type: Boolean, default: false },
  usedAt: Date
},{
    timestamps: true,
    versionKey: false
  });


couponSchema.statics.redeem = async function (couponCode, userId) {
  const Coupon = this;
  const Attendance = mongoose.model('Attendance');

  const coupon = await Coupon.findOne({ code: couponCode, user: userId });
  if (!coupon) throw new Error('Coupon not found or not assigned to user');
  if (coupon.used) throw new Error('Coupon already redeemed');
  if (coupon.validFrom && new Date() < coupon.validFrom) throw new Error('Coupon not yet valid');
  if (coupon.validTo && new Date() > coupon.validTo) throw new Error('Coupon expired');

  
  coupon.used = true;
  coupon.usedAt = new Date();
  await coupon.save();

  
  const attendance = new Attendance({
    user: userId,
    venue: coupon.venue,
    status: 'in'
  });
  await attendance.save();

  return { coupon, attendance };
};

export default mongoose.model('Coupon', couponSchema);
