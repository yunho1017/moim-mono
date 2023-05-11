import memoize from "lodash/memoize";
import { isBrowser } from "./envChecker";

function getUserLocalesList() {
  let languageList: string[] = [];

  if (isBrowser()) {
    if (window.navigator.languages) {
      languageList = languageList.concat(window.navigator.languages);
    }
    if (window.navigator.language) {
      languageList.push(window.navigator.language);
    }
  }

  // Default value
  languageList.push("en-US");

  return languageList;
}

export const getUserLocale = memoize(() => getUserLocalesList()[0]);

export default getUserLocale;
