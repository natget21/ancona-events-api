import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';
import { S3Client, GetObjectCommand,DeleteObjectCommand  } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const storageType = process.env.STORAGE_TYPE || 'local'; 

const localStoragePath = './uploads';

export const  setupStorage = () =>{
  if(storageType === 'local'){
    if (!fs.existsSync(localStoragePath)) {
      fs.mkdirSync(localStoragePath, { recursive: true });
      console.log(`Local storage directory created at: ${localStoragePath}`);
    }else{
      console.log(`Local storage has been setup at: ${localStoragePath}`);
    }
  }
  if (!fs.existsSync(localStoragePath)) {
    fs.mkdirSync(localStoragePath, { recursive: true });
  }
}

export const uploadResourcesToStorage = async (file) => {
  let filePath;

  if (storageType === 'local') {
    filePath = await uploadToLocal(file);
  } else if (storageType === 'S3') {
    const s3Response = await uploadToCloud(file);
    filePath = s3Response.Location;  
  }
  
  return filePath;
}


export const uploadToLocal = (file) => { 
  const filePath = path.join(localStoragePath, file.originalname);
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, file.buffer, (err) => {
      if (err) reject(err);
      resolve(filePath);
    });
  });
};


export const uploadToCloud = (file) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};


export const deleteResourcesFromStorage = async (resource) => {
  try {
    if (resource.storageType === 'local') {
      await fs.unlink(resource.filePath);
    } else if (resource.storageType === 'S3') {
      await deleteFromS3(resource.filePath);
    }
    return Promise.resolve('Resource deleted successfully');
  } catch (error) {
    return Promise.reject(new Error(`Failed to delete resource: ${error.message}`));
  }
}






export const generateSignedUrl = async (filePath) => {

  const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: filePath, // e.g. 'uploads/user123/file.pdf'
  });

  // Generate signed URL valid for 15 minutes
  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 15 });

  return signedUrl;
};


import crypto from 'crypto';

const generateLocalSignedUrl = (filePath, expiresInSeconds = 300) => {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const secret = process.env.SIGNED_URL_SECRET || 'super_secret';

  const data = `${filePath}.${expiresAt}.${secret}`;
  const signature = crypto.createHash('sha256').update(data).digest('hex');

  const encodedPath = encodeURIComponent(filePath);
  return `/download?file=${encodedPath}&expires=${expiresAt}&sig=${signature}`;
};

export const deleteFromS3 = async (filePath) => {
  // try {
  //   const command = new DeleteObjectCommand({
  //     Bucket: process.env.AWS_S3_BUCKET,
  //     Key: filePath, // e.g. 'uploads/myfile.pdf'
  //   });

  //   await s3Client.send(command);
  //   console.log(`✅ Deleted from S3: ${filePath}`);
  // } catch (error) {
  //   console.error(`❌ Failed to delete from S3: ${filePath}`, error);
  //   throw new Error(`Failed to delete file from S3: ${error.message}`);
  // }
};