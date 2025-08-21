import mongoose from 'mongoose';

const PromptCategorySchema = new mongoose.Schema({
  title: {
    En: { type: String, required: true },
    It: { type: String, required: true }
  },
  description: {
    En: { type: String, required: true },
    It: { type: String, required: true }
  },
  promptIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prompt' }]
}, { timestamps: true });


PromptCategorySchema.virtual('_prompts', {
  ref: 'Prompt', 
  localField: 'promptIds',
  foreignField: '_id',
  justOne: false 
});

PromptCategorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false
});

export const PromptCategory = mongoose.model('PromptCategory', PromptCategorySchema);
