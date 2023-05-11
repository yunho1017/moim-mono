// DEV CONFIG
const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const babelLoaderNodeModules = ["react-intl", "xmlbuilder", "@aws-sdk"];

module.exports = {
  externals: {
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
    "react/addons": true,
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [
      ".webpack.js",
      ".web.js",
      ".ts",
      ".tsx",
      ".js",
      ".jsx",
      ".svg",
    ],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      "@icon": path.resolve(__dirname, "./app/common/icons"),
    },
  },
  module: {
    rules: [
      {
        test: /node_modules\/mqtt/,
        use: [
          {
            loader: "shebang-loader",
          },
        ],
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: new RegExp(
          `node_modules/(?!(${babelLoaderNodeModules.join("|")})/).*`,
        ),
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: new RegExp(
          `node_modules/(?!(${babelLoaderNodeModules.join("|")})/).*`,
        ),
        use: "happypack/loader?id=ts-build",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.html$/,
        use: "raw-loader",
      },
      {
        test: /\.gif$/,
        use: "url-loader",
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: { "@reset-import": false },
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: "css-loader" },
        ],
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      memoryLimit: 4096,
    }),
    new HappyPack({
      id: "ts-build",
      threads: require("os").cpus().length - 1,
      loaders: [
        {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
        {
          loader: "ts-loader",
          options: {
            happyPackMode: true,
            getCustomTransformers: path.join(
              __dirname,
              "./webpack.ts-transformers.js",
            ),
          },
        },
      ],
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(en|ko)$/,
    ),
    new webpack.ContextReplacementPlugin(
      /react-intl[\\\/]locale-data$/,
      /^\.\/(en|ko)$/,
    ),
    new HtmlWebpackPlugin({
      template: "app/callback.html",
      filename: "callback.html",
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: "moim-[contenthash].css",
    }),
  ],
};
