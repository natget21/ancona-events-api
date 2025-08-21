import mongoose from 'mongoose';

const PromptSchema = new mongoose.Schema({
    title: {
      En: { type: String, required: true },
      It: { type: String, required: true }
    },
    description: {
      En: { type: String, required: true },
      It: { type: String, required: true }
    },
    isFavorite: { type: Boolean, default: false },
    isOnMarket: { type: Boolean, default: false },
    price : { type: Number, required: false }
  }, { timestamps: true });

  PromptSchema.set('toJSON', {
    // virtuals: true,
    versionKey: false
  });
  
  export const Prompt = mongoose.model('Prompt', PromptSchema);
  