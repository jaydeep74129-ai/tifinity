import { head } from '@vercel/blob';

export async function GET() {
  try {
    const blob = await head('tifinity-latest.apk');

    return new Response(null, {
      status: 302,
      headers: {
        Location: blob.url,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('APK lookup failed:', error);

    return new Response('Tifinity APK is not published yet.', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-store',
      },
    });
  }
}