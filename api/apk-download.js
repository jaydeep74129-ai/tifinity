import { head } from '@vercel/blob';

export default async function handler() {
  try {
    const blob = await head('tifinity-latest.apk');

    return new Response(null, {
      status: 302,
      headers: {
        Location: blob.url,
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    return new Response(
      'Tifinity APK is not published yet.',
      { status: 404 }
    );
  }
}
