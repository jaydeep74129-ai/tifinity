TIFINITY UPDATED BUILD

Included updates:
1. Header Tifinity logo mark is now always visible beside the name.
2. Customer menu drawer has a green "Mobile App — Download" button at the bottom.
3. Admin panel has a "Mobile App" module with APK upload + public URL fallback.
4. APK upload attempts Vercel Blob publishing through /api/upload-apk. The customer download button uses /api/apk-download when a server APK is available.
5. Local IndexedDB APK fallback is retained for same-browser testing.
6. Tifinity wallet ledger added/connected to Tiffin subscription purchase and refund lifecycle.
7. Tiffin subscription creates a subscription record, sends it to connected restaurant partner orders, and exposes it to Admin.
8. Restaurant/Admin acceptance flow and customer cancellation/refund flow added.
9. Refund creates a separate wallet credit transaction and prevents duplicate refunding.

VERCEL APK PUBLISHING
- Deploy the whole folder, not only the HTML file.
- Keep package.json and the api/ folder.
- In Vercel, connect a Vercel Blob store to the project so BLOB_READ_WRITE_TOKEN is available.
- Admin > Mobile App > Upload APK.
- If Blob is not configured, the APK is kept locally in IndexedDB and can be tested on that browser; alternatively paste a public APK URL.

IMPORTANT
The current HTML application still uses browser localStorage for its demo data architecture. For true multi-device customer/restaurant/admin synchronization of wallets, subscriptions and orders, a shared backend (Firestore/Supabase/etc.) should replace those localStorage records.
