const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "web",
  devtool: "source-map",
  entry: {
    index: "./src/index.tsx",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/i,
        type: "asset/resource",
      },
      {
        test: /\.(jpe?g|gif|png|wav|mp3)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    // new CopyWebpackPlugin({
    //  patterns: [{ from: "translations", to: "translations" }],
    //}),
  ],
};
