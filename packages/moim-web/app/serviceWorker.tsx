/*
 * declare service worker global type on typescript
 * https://github.com/Microsoft/TypeScript/issues/14877#issuecomment-493729050
 * */
export default null;
declare let self: ServiceWorkerGlobalScope;

function isFunction(obj: object) {
  return obj && {}.toString.call(obj) === "[object Function]";
}

function runFunctionString(funcStr: string) {
  if (funcStr.trim().length > 0) {
    const func = new Function(funcStr);
    if (isFunction(func)) {
      func();
    }
  }
}

self.addEventListener("message", function(event) {
  (self as any).clients = event.source;
});

self.addEventListener("notificationclose", function(event) {
  /* Tell Push to execute close callback */
  (self as any).client.postMessage(
    JSON.stringify({
      id: event.notification.data.id,
      action: "close",
    }),
  );
});

self.addEventListener("notificationclick", function(event: any) {
  let link: string = "";
  let origin;
  let href: string = "";

  if (
    typeof event.notification.data.link !== "undefined" &&
    event.notification.data.link !== null
  ) {
    origin = event.notification.data.origin;
    link = event.notification.data.link;
    href = `${origin.substring(0, origin.indexOf("/", 8))}/`;

    /* Removes prepending slash, as we don't need it */
    if (link[0] === "/") {
      link = link.length > 1 ? link.substring(1, link.length) : "";
    }

    event.notification.close();

    /* This looks to see if the current is already open and focuses if it is */
    event.waitUntil(
      self.clients
        .matchAll({
          type: "window",
        })
        .then(function(clientList: any[]) {
          let client;
          let full_url;

          clientList.forEach(item => {
            client = item;
            full_url = href + link;

            /* Covers case where full_url might be http://example.com/john and the client URL is http://example.com/john/ */
            if (
              full_url[full_url.length - 1] !== "/" &&
              client.url[client.url.length - 1] === "/"
            ) {
              full_url += "/";
            }

            if (client.url === full_url && "focus" in client) {
              return client.focus();
            }
          });

          if (self.clients.openWindow) {
            return self.clients.openWindow(`/${link}`);
          }
        })
        .catch(function(error: any) {
          throw new Error(`A ServiceWorker error occurred: ${error.message}`);
        }),
    );
  }

  runFunctionString(event.notification.data.onClick);
});

self.addEventListener("install", () => {
  console.log("[ServiceWorker] install");
});
self.addEventListener("activate", () => {
  console.log("[ServiceWorker] activate");
});
