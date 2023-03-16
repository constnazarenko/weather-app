const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[fullhash].js",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.LOCAL": "true",
      "process.env.VERSION": JSON.stringify(process.env.npm_package_version),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    hot: true,
    devMiddleware: {
      publicPath: "/",
      serverSideRender: true,
      writeToDisk: true,
    },
    client: {
      logging: "info",
      overlay: true,
      progress: true,
    },
    static: {
      directory: path.resolve(__dirname, "assets"),
      staticOptions: {},
      // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
      // Can be:
      // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
      publicPath: "/assets",
      // Can be:
      // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
      serveIndex: true,
      // Can be:
      // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
      watch: true,
    },
    open: {
      target: ["/"],
      app: {
        name: "google chrome",
        arguments: ["--incognito", "--new-window"],
      },
    },
    port: 3003,
  },
});
