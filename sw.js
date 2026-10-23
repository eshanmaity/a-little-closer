```javascript
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const { title, body } = event.data;

    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: "./icon.png",
        badge: "./icon.png",
        tag: "birthday-countdown-" + Date.now()
      })
    );
  }
});

self.addEventListener("notificationclick", event => {
  event.notification.close();

  event.waitUntil(
    self.clients.matchAll({
      type: "window",
      includeUncontrolled: true
    }).then(clients => {
      if (clients.length > 0) {
        return clients[0].focus();
      }

      return self.clients.openWindow("./");
    })
  );
});
```
