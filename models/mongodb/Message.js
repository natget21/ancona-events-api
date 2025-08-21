import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    type: { type: String, enum: ['prompt', 'bot', 'user'], required: true },
    historyId: { type: mongoose.Schema.Types.ObjectId, ref: 'History', required: true },
    promptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' },
    content: { type: String, required: true },
    saved: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now }
  }, { timestamps: true });

  MessageSchema.set('toJSON', {
    // virtuals: true,
    versionKey: false
  });
  
  export const Message = mongoose.model('Message', MessageSchema);
  