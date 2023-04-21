const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    assetModuleFilename: "images/[hash][ext][query]",
    filename: "index.js",
    library: "WeatherAPP",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "index.css",
    }),
    new webpack.DefinePlugin({
      "process.env.LOCAL": "false",
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
});
