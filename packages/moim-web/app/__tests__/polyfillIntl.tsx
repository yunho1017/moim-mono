import areIntlLocalesSupported from "intl-locales-supported";
import { SUPPORTED_LANGUAGES } from "app/intl";

export default function polyfillIntlInNode() {
  if (global.Intl) {
    if (!areIntlLocalesSupported(SUPPORTED_LANGUAGES)) {
      const IntlPolyfill = require("intl"); // eslint-disable-line
      Intl.NumberFormat = IntlPolyfill.NumberFormat;
      Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
      require("intl-pluralrules");
      require("@formatjs/intl-relativetimeformat/polyfill");
      require("@formatjs/intl-relativetimeformat/dist/locale-data/ko");
    }
  } else {
    global.Intl = require("intl"); // eslint-disable-line
    polyfillIntlInNode();
  }
}
