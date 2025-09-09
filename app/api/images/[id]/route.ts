import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const image = await prisma.image.findUnique({
      where: { id: params.id },
      select: {
        data: true,
        mimeType: true,
        filename: true,
      },
    });

    if (!image) {
      return new NextResponse('Image not found', { status: 404 });
    }

    return new NextResponse(new Uint8Array(image.data), {
      headers: {
        'Content-Type': image.mimeType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Disposition': `inline; filename="${image.filename}"`,
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
