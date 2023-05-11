import { isBrowser } from "common/helpers/envChecker";

class ServiceWorker {
  public constructor() {
    if (!this.isSupported()) {
      throw new Error("service worker is not supported");
    }
  }

  public async register(path: string) {
    try {
      return await navigator.serviceWorker.register(path);
    } catch (e) {
      throw new Error("fail: service worker file is not found.");
    }
  }

  public isSupported(): boolean {
    return isBrowser() && "serviceWorker" in navigator;
  }
}

export default ServiceWorker;
