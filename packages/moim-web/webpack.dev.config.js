const webpack = require("webpack");
const fs = require("fs");
const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const optimization = require("./webpack.optimization.config.js");
const LoadablePlugin = require("@loadable/webpack-plugin");
const aliasDev = require("./webpack.dev-alias.config.js");

module.exports = merge(common, optimization, aliasDev, {
  mode: "development",
  entry: {
    main: ["./app/client/index.tsx"],
    serviceWorker: "./app/serviceWorker.tsx",
  },
  output: {
    path: "/dist",
    filename: "[name].js",
    globalObject: "this",
  },
  devtool: "cheap-module-source-map",
  node: {
    fs: "empty",
  },
  stats: { warnings: false },
  devServer: {
    allowedHosts: [".lvh.me", "localhost"],
    before: function(app) {
      app.get("/oauth/connect/cryptobadge/callback", function(req, res) {
        fs.readFile("./app/callback.html", (err, content) => {
          res.set("Content-Type", "text/html");
          res.send(content.toString());
        });
      });

      app.get("/plugin/revised/callback", function(req, res) {
        fs.readFile("./app/plugin_callback.html", (err, content) => {
          res.set("Content-Type", "text/html");
          res.send(content.toString());
        });
      });
    },
    compress: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.PROJECT_NAME": JSON.stringify("moim-web"),
      "process.env.DQUEST_SERVICE_ID_STAGE": JSON.stringify(
        "yoO3V786TIjZpVr4kpJf67RwrEl4gy3y",
      ),
      "process.env.DQUEST_SERVICE_ID_PROD": JSON.stringify(
        "bVNr9THd3NAnAqllTkbDJUUUD60JmiKb",
      ),
    }),
    new HtmlWebpackPlugin({
      env: {
        deployVersion: "development",
      },
      template: "app/index.ejs",
      inject: false,
      NODE_ENV: "development",
    }),
    new LoadablePlugin(),
  ],
});
