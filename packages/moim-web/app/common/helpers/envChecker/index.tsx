import {
  getSubdomain,
  isPathnameIncludeMoimHost,
} from "app/common/helpers/getSubdomain";

export const env = (() => {
  // tslint:disable:no-object-literal-type-assertion
  if (process.env.NODE_ENV && process.env.NODE_ENV === "test") {
    // Test env
    return { platform: "test", stage: "test" } as const;
  } else if (typeof window === "undefined" || typeof document === "undefined") {
    // Server side rendering production enviroment
    return {
      platform: "server",
      stage: "prod",
    } as const;
  } else {
    if (process.env.PHASE === "PRODUCTION") {
      // Browser production env
      return {
        platform: "browser",
        stage: "prod",
        renderer: "client",
      } as const;
    } else if (process.env.PHASE === "STAGING") {
      return {
        platform: "browser",
        stage: "stage",
        renderer: "client",
      } as const;
    } else {
      // Browser local(development) env
      return { platform: "browser", stage: "dev" } as const;
    }
  }
  // tslint:enable:no-object-literal-type-assertion
})();

export function isProd(): boolean {
  return env.platform === "browser" && env.stage === "prod";
}

export function isStage(): boolean {
  return env.platform === "browser" && env.stage === "stage";
}

export function isDev(): boolean {
  return env.stage === "dev";
}

export function isTest(): boolean {
  return env.stage === "test";
}

export function isServer(): boolean {
  return env.platform === "server";
}

export function isBrowser(): boolean {
  return !isServer() && !isTest();
}

export const isElectronApp = () => {
  // Ref: https://github.com/cheton/is-electron/blob/master/index.js
  const anyWindow = window as any;
  const anyProcess = process as any;
  if (
    typeof anyWindow !== "undefined" &&
    typeof anyWindow.process === "object" &&
    anyWindow.process.type === "renderer"
  ) {
    return true;
  }

  if (
    typeof anyProcess !== "undefined" &&
    typeof anyProcess.versions === "object" &&
    !!anyProcess.versions.electron
  ) {
    return true;
  }

  if (
    typeof navigator === "object" &&
    typeof navigator.userAgent === "string" &&
    navigator.userAgent.indexOf("Electron") >= 0
  ) {
    return true;
  }

  return false;
};

export function isSecondaryWindow(): boolean {
  return isBrowser() && window.name !== "";
}

export function isHubDomain(pathname?: string) {
  return (
    (getSubdomain(pathname) === "www" || getSubdomain(pathname) === "") &&
    isPathnameIncludeMoimHost(pathname)
  );
}

export function isGroupDomain() {
  return !isHubDomain();
}
