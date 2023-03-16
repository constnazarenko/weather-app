const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    library: "FlexForm",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react",
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom",
    },
    "prop-types": {
      root: "PropTypes",
      commonjs: "prop-types",
      commonjs2: "prop-types",
      amd: "prop-types",
    },
    "react-dom/server": {
      root: "ReactDOMServer",
      commonjs: "react-dom/server",
      commonjs2: "react-dom/server",
      amd: "react-dom/server",
    },
    "react-addons-transition-group": {
      commonjs: "react-addons-transition-group",
      commonjs2: "react-addons-transition-group",
      amd: "react-addons-transition-group",
      root: ["React", "addons", "TransitionGroup"],
    },
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
