import { NextRequest, NextResponse } from 'next/server';
import { withDbConnection } from '@/lib/mongodb';
import Media from '@/models/Media';
import { uploadImage } from '@/lib/cloudinary';
import { getAdminFromRequest } from '@/lib/auth';
import { rateLimit } from '@/lib/rate-limit';

// Anonymous visitors may only attach documents to a support application.
const PUBLIC_UPLOAD_FOLDER = 'applications';
const PUBLIC_MAX_FILES = 10;
const PUBLIC_MAX_FILE_BYTES = 10 * 1024 * 1024;
const isHttpUrl = (value: string) => {
  try {
    const { protocol } = new URL(value);
    return protocol === 'https:' || protocol === 'http:';
  } catch {
    return false;
  }
};
const isPublicDocumentType = (type: string) => type.startsWith('image/') || type === 'application/pdf';


// Media service handlers
const MediaService = {
  handleVideoUpload: async (formData: FormData) => {
    const folder = formData.get('folder')?.toString() || 'general';
    const videoUrl = formData.get('videoUrl')?.toString();
    const thumbnail = formData.get('thumbnail');
    const title = formData.get('title')?.toString() || 'Video';
    const tag = typeof formData.get('tag') === 'string' ? formData.get('tag')?.toString().trim() : '';

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
        tag,
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
    const files = formData.getAll('files').filter((f): f is File => f instanceof File);

    const isAdmin = Boolean(await getAdminFromRequest(request));
    if (!isAdmin) {
      const limited = rateLimit(request, 'public-upload', { limit: 20, windowMs: 60 * 60 * 1000 });
      if (limited) return limited;
      if (videoUrl || folder !== PUBLIC_UPLOAD_FOLDER) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      if (files.length > PUBLIC_MAX_FILES) {
        return NextResponse.json({ error: `You can upload up to ${PUBLIC_MAX_FILES} files` }, { status: 400 });
      }
      const invalid = files.find((f) => !isPublicDocumentType(f.type) || f.size > PUBLIC_MAX_FILE_BYTES);
      if (invalid) {
        return NextResponse.json({ error: 'Documents must be images or PDFs under 10 MB' }, { status: 400 });
      }
    }

    if (videoUrl) {
      if (!isHttpUrl(videoUrl)) {
        return NextResponse.json({ error: 'Video URL must start with http:// or https://' }, { status: 400 });
      }
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