Tifinity Website Package
========================

Entry point:
  index.html

This package is ready to upload to normal HTTPS web hosting and point a domain at.

Included:
- Responsive Tifinity website (mobile + desktop)
- PWA manifest + icons
- Service worker for app-shell caching
- Browser permissions policy for geolocation/camera/microphone
- Apache, Netlify-style, and Vercel header configs
- robots.txt

IMPORTANT:
Browsers do not allow a website to silently grant location, notification, camera,
or microphone permissions. The visitor must approve the browser prompt. The site
already uses HTTPS-compatible browser APIs and exposes a user-gesture helper for
requesting notifications/location.

Domain deployment:
1. Upload the contents of this folder to your web host.
2. Make sure index.html is the public root.
3. Enable HTTPS/SSL for the domain.
4. Point the domain DNS to the hosting provider.
5. Open https://your-domain/ and test GPS, notifications and Supabase sync.

For production:
- Keep Supabase credentials/RLS correctly configured.
- Do not put a Supabase service_role key in browser code. Use only the publishable/anon key.
