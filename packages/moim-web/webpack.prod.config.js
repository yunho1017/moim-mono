const merge = require("webpack-merge");
const common = require("./webpack.common.config.js");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: "production",
  entry: ["./app/bootstrapServer.js", "./app/server.tsx"],
  output: {
    libraryTarget: "commonjs",
    library: "vingleGroup",
    filename: "./bundle.js",
  },
  target: "node",
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});
