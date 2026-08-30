TIFINITY CLEAN MASTER UPLOAD

Replace the current GitHub repository contents with the CONTENTS of this
folder. Upload the folder contents directly to the repository ROOT.

REQUIRED ROOT FILES:
- index.html
- sw.js
- manifest.webmanifest
- favicon.png
- icon-192.png
- icon-512.png
- apple-touch-icon.png
- _headers
- .htaccess
- package.json

REQUIRED API FOLDER:
- api/apk-download.js
- api/upload-apk.js

CLEANUP REQUIREMENTS:
- Remove all old duplicate HTML files.
- Remove any old root-level apk-download.js.
- Remove any old root-level upload-apk.js.
- Do not keep duplicate copies of the API routes.
- Do not keep obsolete or conflicting files from the previous package.
- Do not modify, rename, or duplicate the required files.

FINAL REPOSITORY STRUCTURE:

/
├── index.html
├── sw.js
├── manifest.webmanifest
├── favicon.png
├── icon-192.png
├── icon-512.png
├── apple-touch-icon.png
├── _headers
├── .htaccess
├── package.json
└── api/
    ├── apk-download.js
    └── upload-apk.js

IMPORTANT:
This package is the CLEAN MASTER version and is intended to replace the
previous repository contents.

After upload, verify that:
1. index.html is at the repository root.
2. Both API files exist only inside /api/.
3. No old duplicate HTML or API files remain.
4. The final deployment uses this clean master structure.