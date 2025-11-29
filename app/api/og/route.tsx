import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Blog Post';
    const author = searchParams.get('author') || 'Raghu Anand';
    const date = searchParams.get('date') || '';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            padding: '80px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            {/* Title */}
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: '#1a1a1a',
                lineHeight: 1.2,
                marginBottom: 40,
                maxWidth: '100%',
                wordWrap: 'break-word',
              }}
            >
              {title}
            </div>

            {/* Date if provided */}
            {date && (
              <div
                style={{
                  fontSize: 28,
                  color: '#666666',
                  marginBottom: 20,
                }}
              >
                {date}
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderTop: '4px solid #dc2626',
              paddingTop: 40,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: '#1a1a1a',
                }}
              >
                {author}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: '#666666',
                  marginTop: 8,
                }}
              >
                Software Engineer
              </div>
            </div>
            <div
              style={{
                fontSize: 28,
                color: '#666666',
              }}
            >
              raghuanand.me
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('Error generating OG image:', e.message);
    return new Response('Failed to generate image', { status: 500 });
  }
}
