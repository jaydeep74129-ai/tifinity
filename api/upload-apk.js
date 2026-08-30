import { handleUpload } from '@vercel/blob/client';

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: {
        Allow: 'POST',
      },
    });
  }

  try {
    const body = await request.json();

    const response = await handleUpload({
      body,
      request,

      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          'application/vnd.android.package-archive',
        ],
        addRandomSuffix: false,
        tokenPayload: JSON.stringify({
          source: 'tifinity-admin',
        }),
      }),

      onUploadCompleted: async () => {
        // APK upload completed
      },
    });

    return Response.json(response);
  } catch (error) {
    console.error('APK upload failed:', error);

    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'APK upload failed',
      },
      { status: 400 }
    );
  }
}