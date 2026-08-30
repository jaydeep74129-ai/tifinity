TIFINITY REQUIRED FIX PATCH — 2026-08-26

Apply this patch over the current Tifinity repository.

1. Replace/update the existing service worker with the patched version.
   The updated service worker automatically injects
   tifinity-runtime-patch.js into index.html at runtime.
   Therefore, do NOT rewrite or modify the existing index.html.

2. Add/update the Vercel API routes under /api/:
   - /api/upload-apk
   - /api/apk-download

   These routes must resolve correctly for the existing frontend API paths.

3. Preserve all existing Tifinity functionality and files.
   Do not remove or overwrite unrelated features.

4. After deployment, fully close and reopen the Tifinity website once.
   This is required so the updated service worker can activate.

PATCH OBJECTIVE:
Ensure the APK upload/download system works correctly with the existing
Tifinity frontend while keeping the current index.html and existing
application functionality intact.