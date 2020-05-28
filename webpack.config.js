var path = require("path");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts", // 入口文件
  output: {
    // 指定输出选项
    path: resolve(__dirname, "./dist"), // 输出路径
    filename: "bundle.js", // 指定输出文件的名称
  },
  resolve: {
    extensions: [".js", ".ts", ".json"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 指定模板文件路径
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
};
