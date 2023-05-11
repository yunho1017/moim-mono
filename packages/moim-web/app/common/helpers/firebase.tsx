// helper
import { isBrowser, isProd } from "./envChecker";
import FIREBASE_STAGE_CONFIG from "app/config/firebase_stage.json";
import FIREBASE_CONFIG from "app/config/firebase.json";
import FIREBASE_REMOTE_CONFIG from "app/config/firebaseRemoteConfig.json";

export const FIREBASE_STAGE_TRACKING_ID = "G-EHSGC0PLLF";
export const FIREBASE_PROD_TRACKING_ID = "G-LQC8P84540";

export const initializeApp = (() => {
  let app: firebase.app.App;

  return async () => {
    if (!isBrowser()) {
      return;
    }

    if (!app) {
      const [fireBase] = await Promise.all([
        import("firebase/app"),
        import("firebase/analytics"),
        import("firebase/remote-config"),
      ]);

      app = fireBase.initializeApp(
        isProd() ? FIREBASE_CONFIG : FIREBASE_STAGE_CONFIG,
      );
    }

    return app;
  };
})();

export async function getAnalytics() {
  const app = await initializeApp();

  if (!app) {
    return;
  }

  return app.analytics();
}

export async function getRemoteConfig(): Promise<
  firebase.remoteConfig.RemoteConfig | undefined
> {
  const app = await initializeApp();

  if (!app) {
    return;
  }

  const remoteConfig = app.remoteConfig();

  remoteConfig.settings = FIREBASE_REMOTE_CONFIG;

  return remoteConfig;
}
