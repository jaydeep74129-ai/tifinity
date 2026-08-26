const CACHE='tifinity-ultra-v5';
const CORE_ASSETS=['./','./index.html','./manifest.webmanifest','./favicon.png','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE_ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  const req=event.request;
  if(req.mode==='navigate'||req.destination==='document'){
    event.respondWith(
      fetch(req,{cache:'no-store'})
      .then(res=>{if(res&&res.ok)caches.open(CACHE).then(c=>c.put('./index.html',res.clone())).catch(()=>{});return res;})
      .catch(()=>caches.match('./index.html'))
    );
    return;
  }
  event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(res=>{
    if(res&&res.ok)caches.open(CACHE).then(c=>c.put(req,res.clone())).catch(()=>{});
    return res;
  }).catch(()=>new Response('',{status:504,statusText:'Offline'}))));
});