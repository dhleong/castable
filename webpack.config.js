const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./castable Extension/ts/index.ts",
  },
  output: {
    filename: "castable-script.js",
    path: path.resolve(__dirname, 'castable Extension/Resources'),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: "ts-loader" },
    ],
  },
};
