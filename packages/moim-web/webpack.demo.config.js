const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");
const webpack = require("webpack");
const optimization = require("./webpack.optimization.config");
const LoadablePlugin = require("@loadable/webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, optimization, {
  mode: "production",
  entry: {
    bundleBrowser: [
      "babel-polyfill",
      "proto-polyfill",
      "./app/bootstrap.js",
      "whatwg-fetch",
      "url-polyfill",
      "intersection-observer",
      "smoothscroll-polyfill",
      "./app/client/index.tsx",
    ],
    vendor: ["react", "react-dom", "react-intl"],
    serviceWorker: "./app/serviceWorker.tsx",
  },
  output: {
    filename: "./[name].js",
    sourceMapFilename: "[name].js.map",
    chunkFilename: "./[name].[chunkhash].js",
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.PROJECT_NAME": JSON.stringify("moim-web"),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      env: {
        deployVersion: "./",
      },
      template: "app/index.ejs",
      inject: false,
      NODE_ENV: "production",
    }),
    new LoadablePlugin({
      filename: "vendor.json",
      writeToDisk: true,
    }),
  ],
});
