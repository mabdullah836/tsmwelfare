import { v2 as cloudinary } from 'cloudinary';

const config = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

if (!config.cloud_name || !config.api_key || !config.api_secret) {
  throw new Error('Missing Cloudinary environment variables');
}

cloudinary.config(config);
export async function uploadImage(buffer: Buffer, folder = 'tsmwelfare') {
  return new Promise<ReturnType<typeof cloudinary.uploader.upload>>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Upload failed'));
        resolve(Promise.resolve(result));
      }
    );

    uploadStream.end(buffer);
  });
}

export const optimizeImageUrl = (url: string, width = 800) => {
  return url.replace('/upload/', `/upload/w_${width},f_auto,q_auto/`);
};

export default cloudinary;