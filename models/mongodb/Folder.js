import mongoose from 'mongoose';

const FolderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  editable: { type: Boolean, default: true }
}, { timestamps: true });

FolderSchema.set('toJSON', {
  // virtuals: true,
  versionKey: false
});

export const Folder = mongoose.model('Folder', FolderSchema);
