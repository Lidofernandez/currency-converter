const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const precss = require("precss");
const postcssPresetEnv = require("postcss-preset-env");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/index.jsx",
  resolve: {
    extensions: [".jsx", ".js"],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin({ filename: "main.[contenthash].css" }),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: "sw.js",
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.exchangeratesapi\.*/,
          handler: "CacheFirst",

          options: {
            cacheName: "APIs",

            expiration: {
              maxEntries: 10,
            },
          },
        },
      ],
      clientsClaim: true,
      skipWaiting: false,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        options: {
          compact: false,
        },
      },
      {
        test: /\.s[ac]ss$/i,

        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "postcss-loader",

            options: {
              postcssOptions: {
                plugins: [precss, autoprefixer, postcssPresetEnv],
              },
            },
          },
        ],
      },
    ],
  },

  devServer: {
    open: true,
    host: "localhost",
  },
};
