import {
  PIXEL_TO_REM_RATIO,
  REM_STANDARD_WIDTH,
} from "common/constants/default";
import { isBrowser } from "common/helpers/envChecker";

export function px2remValue(value: number) {
  return Math.round(value * PIXEL_TO_REM_RATIO * 1000) / 1000;
}

export function px2rem(value: number) {
  if (value === 0) {
    return "0";
  }
  if (Math.abs(value) <= 1) {
    return `${value}px`;
  }
  return `${px2remValue(value)}rem`;
}

export function makeViewportValue() {
  return 100 / PIXEL_TO_REM_RATIO / REM_STANDARD_WIDTH;
}

export function standardPixelConvert(pixel: number) {
  const windowWidth = isBrowser() ? window.innerWidth : REM_STANDARD_WIDTH;
  const ratio = windowWidth / REM_STANDARD_WIDTH;
  return ratio * pixel;
}

export function rem2px(value: number) {
  let windowFontSize = "10px";
  requestAnimationFrame(() => {
    windowFontSize = window.getComputedStyle(document.documentElement).fontSize;
  });
  const standardPixel = parseFloat(isBrowser() ? windowFontSize : "10px");
  return value * standardPixel;
}
