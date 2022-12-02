const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: {
    index: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  devServer: {
    open: false,
    host: "localhost",
    port: 3000,
    // In development we serve static files from static/. In production, we
    // copy them to the dist directory.
    static: path.resolve(__dirname, "static"),
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins = config.plugins.concat([
      // Copy files in static to dest in production.
      new CopyPlugin({
        patterns: [{ from: "static", to: "." }],
      }),
    ]);
  } else {
    config.mode = "development";
  }
  return config;
};
