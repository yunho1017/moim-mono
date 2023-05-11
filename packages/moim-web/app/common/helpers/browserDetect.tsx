//* Reference docs: https://hgoebl.github.io/mobile-detect.js/doc/MobileDetect.html */
import MobileDetect from "mobile-detect";
import memoize from "lodash/memoize";

export const enum OS_TYPE {
  AndroidOS = "AndroidOS",
  BlackBerry = "BlackBerryOS",
  PalmOS = "PalmOS",
  SymbianOS = "SymbianOS",
  WindowsMobileOS = "WindowsMobileOS",
  WindowsPhoneOS = "WindowsPhoneOS",
  iOS = "iOS",
  iPadOS = "iPadOS",
  MeeGoOS = "MeeGoOS",
  MaemoOS = "MaemoOS",
  JavaOS = "JavaOS",
  webOS = "webOS",
  badaOS = "badaOS",
  BREWOS = "BREWOS",
}

const isNewIpad = Boolean(
  window.navigator.userAgent.match(/Mac/) &&
    window.navigator.maxTouchPoints &&
    window.navigator.maxTouchPoints > 2,
);

const instance = memoize(() => new MobileDetect(window.navigator.userAgent));

export const isApple = memoize(() => {
  const detect = instance();
  switch (detect.os()) {
    case OS_TYPE.iPadOS:
    case OS_TYPE.iOS: {
      return true;
    }
    default: {
      return false;
    }
  }
});

export const isiOS = memoize(() => {
  const detect = instance();
  switch (detect.os()) {
    case OS_TYPE.iOS: {
      return true;
    }
    default: {
      return false;
    }
  }
});

export const isAndroid = memoize(() => {
  const detect = instance();
  switch (detect.os()) {
    case OS_TYPE.AndroidOS: {
      return true;
    }
    default: {
      return false;
    }
  }
});

export const isMobileAgent = memoize(() => {
  const detect = instance();
  return Boolean(detect.phone() || detect.mobile());
});

export const isTablet = memoize(() => {
  const detect = instance();
  return Boolean(detect.tablet()) || isNewIpad;
});
