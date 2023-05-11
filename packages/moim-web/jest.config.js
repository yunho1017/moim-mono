module.exports = {
  preset: "ts-jest",
  globals: {
    NODE_ENV: "test",
    "ts-jest": {
      tsConfig: "./tsconfig.test.json",
      babelConfig: true,
    },
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    ".*\\.(s?css|svg|gif|worker.tsx)$": "<rootDir>/scripts/jestPreprocessor.js",
    "^@icon\\/.*": "<rootDir>/scripts/jestPreprocessor.js",
  },
  setupFilesAfterEnv: [
    "<rootDir>/scripts/jestReporter.js",
    "@testing-library/react-hooks/dont-cleanup-after-each.js",
  ],
  verbose: true,
  rootDir: "",
  modulePaths: ["<rootDir>/", "<rootDir>/app"],
  moduleFileExtensions: ["ts", "tsx", "js", "svg"],
  coveragePathIgnorePatterns: ["/node_modules/", "/hack_modules/"],
  transformIgnorePatterns: ["<rootDir>/node_modules"],
  coverageDirectory: "output/coverage",
  coverageReporters: ["cobertura"],
  testRegex: "__tests__/.*_spec.tsx?$",
  moduleNameMapper: {
    "^@icon/(.*)$": "<rootDir>/app/common/icons/$1",
  },
  moduleDirectories: ["node_modules", "<rootDir>/node_modules"],
  setupFiles: [
    "<rootDir>/app/__tests__/shim.tsx",
    "<rootDir>/app/__tests__/preload.tsx",
    "jest-localstorage-mock",
    "jest-canvas-mock",
    "jest-date-mock",
  ],
  automock: false,
};
