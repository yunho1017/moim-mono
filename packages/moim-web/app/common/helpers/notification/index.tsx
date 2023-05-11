import GroupNotification from "common/helpers/notification/groupNotification";

let instance: Notificator;

class Notificator {
  private notification?: GroupNotification;
  private isInitialize: boolean = false;

  public constructor() {
    if (instance) {
      return instance;
    }
  }

  public static getInstance(): Notificator {
    if (!instance) {
      instance = new Notificator();
    }

    return instance;
  }

  public async initialize() {
    this.notification = new GroupNotification();
    this.notification.requestPermission();
    this.isInitialize = true;
  }

  public notify(data: {
    title: string;
    message: string;
    url?: string;
    options?: NotificationOptions;
  }) {
    if (!this.isInitialize) {
      throw new Error("Notificator is not initialize");
    }

    this.notification?.notify(data);
  }
}

export default Notificator;
