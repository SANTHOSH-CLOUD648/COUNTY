// County Indoor Netz — small helper so phones can install the booking page
// as an app. It NEVER keeps an old copy of the page: every page load still
// comes fresh from the internet, so updates appear straight away.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  // Only page loads are handled; everything else (bookings, images, etc.)
  // goes straight to the network as normal.
  if (event.request.mode !== 'navigate') return;
  event.respondWith(
    fetch(event.request).catch(() => new Response(
      '<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<div style="font-family:system-ui,sans-serif;text-align:center;padding:48px 20px;color:#1a5c38">' +
      '<h2>You are offline</h2><p>Please check your internet connection and try again.</p></div>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    ))
  );
});
