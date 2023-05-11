const tsPreProcessor = require("ts-jest");

module.exports = {
  process: (src, path, config) => {
    if (
      path.endsWith(".scss") ||
      path.endsWith(".css") ||
      path.endsWith(".gif") ||
      path.endsWith(".sass")
    ) {
      return "module.exports = new Proxy({}, { get: function (target, name) { return name; } });";
    }

    if (path.startsWith("@icon") || path.endsWith(".svg")) {
      return `module.exports = new Proxy({}, { get: function () { return function () { return null; }; } });`;
    }

    const typeParsedResult = tsPreProcessor.process(src, path, config);

    return typeParsedResult;
  },
};
