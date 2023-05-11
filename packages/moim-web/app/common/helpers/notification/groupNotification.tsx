import { isBrowser } from "common/helpers/envChecker";

const NOTIFICATION_DEFAULT_OPTIONS: NotificationOptions = {};

class GroupNotification {
  private serviceWorker: ServiceWorkerRegistration | null = null;

  public constructor() {
    if (!this.isSupported()) {
      throw new Error("Notification is not supported");
    }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(swRegistration => {
        this.serviceWorker = swRegistration;
      });
    }
  }

  public async requestPermission() {
    if (!this.isSupported()) {
      console.error("[!] This browser not support Notification");
      return;
    }
    if (this.permission === "default") {
      return Notification.requestPermission();
    }
  }

  public notify({
    title,
    message,
    url,
    options,
  }: {
    title: string;
    message: string;
    url?: string;
    options?: NotificationOptions;
  }) {
    if (!this.isGrunted()) {
      throw new Error("Notification Permission is not grunted");
    }

    this.serviceWorker?.showNotification(title, {
      ...NOTIFICATION_DEFAULT_OPTIONS,
      ...options,
      body: message,
      data: {
        url,
      },
    });
  }

  private get permission(): NotificationPermission {
    return Notification.permission;
  }

  private isGrunted(): boolean {
    return this.permission === "granted";
  }

  private isSupported(): boolean {
    return isBrowser() && "Notification" in window;
  }
}

export default GroupNotification;
