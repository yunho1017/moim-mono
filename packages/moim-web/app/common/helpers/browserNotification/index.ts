import Push, { PushNotificationParams } from "push.js";
import shortid from "shortid";
import { isProd, isStage } from "common/helpers/envChecker";
import { isAndroid } from "common/helpers/browserDetect";

export function initializeBrowserNotification(
  onGranted?: VoidFunction,
  onDenied?: VoidFunction,
) {
  if (
    !Push.Permission.has() ||
    Push.Permission.get() !== Push.Permission.GRANTED
  ) {
    Push.Permission.request(onGranted, onDenied);
  }
}

export function reRequestPermission(
  onGranted?: VoidFunction,
  onDenied?: VoidFunction,
) {
  Push.Permission.request(onGranted, onDenied);
}

function getFunctionBodyAsString(func: VoidFunction) {
  const str = func.toString().match(/function[^{]+{([\s\S]*)}$/);
  return typeof str !== "undefined" && str !== null && str.length > 1
    ? str[1]
    : null;
}

export function showNotification(
  title: string,
  options?: PushNotificationParams,
) {
  const assetPath =
    isProd() || isStage() ? `./app/${process.env.DEPLOY_VERSION}` : "";
  const newTagId = options?.tag || shortid();
  const handleClick = () => {
    closeNotification(newTagId);
    window.focus();
    options?.onClick?.();
  };

  if (isAndroid()) {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(`${assetPath}/serviceWorker.js`)
        .then(sw => {
          const workerData = {
            id: 0,
            link: options?.link,
            origin: document.location.href,
            onClick: getFunctionBodyAsString(handleClick),
          };
          const option = {
            icon: options?.icon,
            body: options?.body,
            tag: newTagId,
            requireInteraction: options?.requireInteraction,
            vibrate: options?.vibrate ? 1 : 0,
            data: workerData,
          };
          sw.showNotification(title, option);
        });
    }
  }

  Push.create(title, {
    ...options,
    link: undefined,
    onClick: handleClick,
    tag: newTagId,
  });
  return newTagId;
}

export function closeNotification(tagId: Moim.Id) {
  Push.close(tagId);
}
