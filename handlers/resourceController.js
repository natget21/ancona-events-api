import { getDBInstance } from '../db/dbSelector.js';
import { Resource } from '../models/mongodb/Resource.js';
import { uploadResourcesToStorage,deleteResourcesFromStorage } from '../utils/fileUploadUtils.js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

import dotenv from 'dotenv';

dotenv.config();

export const uploadResources = async (req, res) => {
  try {
    const file = req.file;
    
    let filePath  = await uploadResourcesToStorage(file);
    
    if (filePath) {
        var resourceData = {
            storageType: process.env.STORAGE_TYPE,
            
            originalName: file.originalname,
            fileSize: file.size,
            fileType: file.mimetype,
            
            filePath: filePath,
            fileUrl: filePath,

            tags: req.body.tags,
            metadata: req.body.metadata,
            userId: req.auth.payload.sub
        };

        const resource = await getDBInstance().create(Resource, resourceData);

        res.status(201).json({ message: 'File uploaded successfully', resource });
    }else{
        res.status(500).json({ error: 'File upload failed'});
    }
  } catch (error) {
    res.status(500).json({ error: 'File upload failed', details: error.message });
  }
};


export const getResourcesDataByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const resources = await await getDBInstance().get(Resource, { userId: userId });

    if (!resources) {
      return res.status(404).json({ message: 'No resources found for this user.' });
    }

    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources', details: error.message });
  }
};


export const getResourceDataById = async (req, res) => {
  try {
    const resource = await getDBInstance().getById(Resource, req.params.id);
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resource', details: error.message });
  }
};

export const getResources = async (req, res) => {
  const resources =  await getDBInstance().get(Resource);
  res.json(resources);
};

export const updateResourceMetaData = async (req, res) => {
  var data = {"tags": req.body.tags, "metadata": req.body.metadata, "status": req.body.status};
  const resource = await getDBInstance().update(Resource, req.params.id, data);
  res.json(resource);
};

export const deleteResource = async (req, res) => {
  const resource = await getDBInstance().getById(Resource, req.params.id);
  if (!resource) {
    return res.status(404).json({ message: 'Resource not found' });
  } else {
    deleteResourcesFromStorage(resource).then(async () => {
      const deleteResource = await getDBInstance().delete(Resource, req.params.id);
      res.status(204).send(deleteResource);
    }).catch((err) => {
      res.status(500).json({ error: 'Failed to delete resource', details: err.message });
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getResourceFile = async (req, res) => {

  const resourceId = req.params.id;

  try {
    const resource = await getDBInstance().getById(Resource, resourceId);

    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    // Check if the user has access to the resource
    if (resource.userId !== req.auth.payload.sub) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Send the file to the client
    const filePath = path.join(process.env.LOCAL_STORAGE_DIR, resource.filePath);
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve file', details: error.message });
  }

}



export const downloadResource = async (req, res) => {
//   try {
//     const { resourceId } = req.params;
//     const userId = req.auth.payload.sub;

//     const resource = await Resource.findById(resourceId);

//     if (!resource) return res.status(404).json({ error: 'Resource not found' });

//     if (resource.userId.toString() !== userId) {
//       return res.status(403).json({ error: 'Access denied' });
//     }

//     // ✅ LOCAL FILE
//     if (resource.storageType === 'local') {
//       const fullPath = path.resolve(resource.filePath);
//       return res.sendFile(fullPath);
//     }

//     // ✅ CLOUD FILE (signed URL)
//     if (resource.storageType === 'cloud') {
//       const signedUrl = await generateSignedUrl(resource.filePath); // AWS S3 or similar
//       return res.json({ url: signedUrl });
//     }

//     res.status(400).json({ error: 'Unknown storage type' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to retrieve file', details: err.message });
//   }
};

// export const handleSignedFileDownload = async (req, res) => {
//   const { file, expires, sig } = req.query;
//   const secret = process.env.SIGNED_URL_SECRET || 'super_secret';

//   if (!file || !expires || !sig) {
//     return res.status(400).json({ error: 'Invalid signed URL' });
//   }

//   const now = Math.floor(Date.now() / 1000);
//   if (parseInt(expires) < now) {
//     return res.status(403).json({ error: 'Signed URL expired' });
//   }

//   const expectedSig = crypto
//     .createHash('sha256')
//     .update(`${file}.${expires}.${secret}`)
//     .digest('hex');

//   if (expectedSig !== sig) {
//     return res.status(403).json({ error: 'Invalid signature' });
//   }

//   const fullPath = path.join(process.env.LOCAL_STORAGE_DIR, file);

//   if (!fs.existsSync(fullPath)) {
//     return res.status(404).json({ error: 'File not found' });
//   }

//   res.sendFile(fullPath);
// };