import { NextRequest, NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import Media from '@/models/Media';
import { uploadImage } from '@/lib/cloudinary';


// Media service handlers
const MediaService = {
  handleVideoUpload: async (formData: FormData) => {
    const folder = formData.get('folder')?.toString() || 'general';
    const videoUrl = formData.get('videoUrl')?.toString();
    const thumbnail = formData.get('thumbnail');
    const title = formData.get('title')?.toString() || 'Video';

    let thumbnailUrl = '';

    if (thumbnail instanceof File) {
      const buffer = Buffer.from(await thumbnail.arrayBuffer());
      const result = await uploadImage(buffer, 'tsmwelfare/thumbnail');
      thumbnailUrl = result?.secure_url;
    } else if (typeof thumbnail === 'string') {
      thumbnailUrl = thumbnail;
    }

    return withDbConnection(() =>
      Media.create({
        name: title,
        title,
        type: 'video',
        url: videoUrl,
        publicId: '',
        size: 'N/A',
        folder,
        thumbnail: thumbnailUrl,
        status: 'pending',
      })
    );
  },

  handleFileUploads: async (files: File[], folder: string) => {
    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const result = await uploadImage(buffer, `tsmwelfare/${folder}`);

      return withDbConnection(() =>
        Media.create({
          name: file.name,
          title: file.name,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          url: result?.secure_url,
          publicId: result?.public_id,
          size: `${(result?.bytes / (1024 * 1024)).toFixed(2)} MB`,
          folder,
        })
      );
    });

    return Promise.all(uploadPromises);
  },
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const folder = formData.get('folder')?.toString() || 'general';
    const videoUrl = formData.get('videoUrl')?.toString();
    const files = formData.getAll('files') as File[];

    if (videoUrl) {
      const media = await MediaService.handleVideoUpload(formData);
      return NextResponse.json([media]);
    }

    if (!files?.length) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    const uploadedFiles = await MediaService.handleFileUploads(files, folder);
    return NextResponse.json(uploadedFiles);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload files' }, { status: 500 });
  }
}