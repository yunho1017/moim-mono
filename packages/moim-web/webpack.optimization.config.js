const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  output: {
    chunkFilename: "./[name].[chunkhash].js",
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
    splitChunks: {
      chunks: "async",
      minSize: 50000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        commons: {
          test: new RegExp("node_modules"),
          name: "vendor",
          chunks: "all",
          enforce: true,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
