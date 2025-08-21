import mongoose from 'mongoose';


const ResourceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fileType: {
    type: String,
    required: false
  },
  tags: {
    type: [String],
    required: false
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    required: false
  },
  storageType: {
    type: String,
    enum: ['local', 'S3'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'deleted', 'archived'],
    default: 'active'
  },
  isPublicResource: {
    type: Boolean,
    default: false
  },
  fileUrl: {
    type: String,
    required: false
  }
},{ timestamps: true });

ResourceSchema.set('toJSON', {
    versionKey: false
});

export const Resource = mongoose.model('Resource', ResourceSchema);
