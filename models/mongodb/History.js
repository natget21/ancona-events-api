import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: false, default: null },
    title: { type: String, required: true },
    // messageIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  }, { timestamps: true });

  HistorySchema.virtual('_folder', {
    ref: 'Folder', 
    localField: 'folderId',
    foreignField: '_id',
    justOne: true 
  });

  // HistorySchema.virtual('_messages', {
  //   ref: 'Message', 
  //   localField: 'messageIds',
  //   foreignField: '_id',
  //   justOne: false 
  // });

  HistorySchema.set('toJSON', {
    virtuals: true,
    versionKey: false
  });
  
  export const History = mongoose.model('History', HistorySchema);
  