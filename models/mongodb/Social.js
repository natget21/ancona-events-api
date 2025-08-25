import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  type: { type: String, enum: ['post', 'story', 'comment'] },
  content: String,
  imageUrl: String,
  caption: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
},{
    timestamps: true,
    versionKey: false
  });

export default mongoose.model('Social', socialSchema);
