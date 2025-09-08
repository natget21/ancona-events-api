import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  createdAt: { type: Date, default: Date.now }
}, { _id: true });

const mediaSchema = new mongoose.Schema({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video'], default: 'image' }
}, { _id: false });

const socialSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  type: { type: String, enum: ['post', 'story', 'comment'], required: true },
  content: String,
  caption: String,
  imageUrl: String,
  media: [mediaSchema],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  expiresAt: { type: Date }, 
  viewedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

}, {
  timestamps: true,
  versionKey: false
});

socialSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('Social', socialSchema);
