module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "defaults",
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        regenerator: true,
      },
    ],
    "@babel/plugin-proposal-nullish-coalescing-operator",
    "@babel/plugin-proposal-optional-chaining",
    [
      "babel-plugin-styled-components",
      {
        fileName: false,
      },
    ],
    "@loadable/babel-plugin",
    "@babel/plugin-syntax-dynamic-import",
    [
      "@simbathesailor/babel-plugin-use-what-changed",
      {
        active: process.env.NODE_ENV === "development", // boolean
      },
    ],
  ],
  env: {
    test: {
      plugins: ["transform-es2015-modules-commonjs", "dynamic-import-node"],
    },
  },
};
