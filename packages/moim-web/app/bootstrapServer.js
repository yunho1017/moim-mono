if (!global.indexedDB) {
  require("fake-indexeddb");
}

if (!global.Intl) {
  global.Intl = require("intl");
}

if (!global.URL) {
  global.URL = require("url").URL;
}
