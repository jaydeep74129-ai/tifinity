TIFINITY REQUIRED FIX PATCH — 2026-08-26

Overlay these files on the current Tifinity repository.
The updated service worker automatically injects tifinity-runtime-patch.js into index.html,
so the existing index.html does not need to be rewritten.

Also adds the Vercel API routes under /api/ so the existing frontend /api/upload-apk and
/api/apk-download paths resolve correctly.

After deployment, fully close/reopen the site once so the new service worker activates.
