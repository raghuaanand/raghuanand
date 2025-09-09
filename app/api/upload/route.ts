import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload request received');
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    console.log('File received:', file ? {
      name: file.name,
      type: file.type,
      size: file.size
    } : 'No file');
    
    if (!file) {
      console.log('Error: No file received');
      return NextResponse.json({ error: 'No file received' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      console.log('Error: Invalid file type:', file.type);
      return NextResponse.json({ error: `Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}` }, { status: 400 });
    }

    // Validate file size (10MB limit - increased from 5MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      console.log('Error: File too large:', file.size);
      return NextResponse.json({ error: `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Max size: 10MB` }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    const extension = file.name.split('.').pop() || '';
    const filename = `${timestamp}-${random}.${extension}`;

    console.log('Generated filename:', filename);

    // Store image in database
    const image = await prisma.image.create({
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        data: buffer,
      },
    });

    console.log('Image stored in database with ID:', image.id);

    // Return the URL to serve the image
    const url = `/api/images/${image.id}`;
    console.log('Upload successful, returning URL:', url);
    
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
