const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  /* entry: {
   *   main: "./src/index.js",
   *   "pdf.worker": "pdfjs-dist/build/pdf.worker.entry"
   * }, */
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: [path.join(__dirname, "dist"), path.join(__dirname, "assets")],
    host: "0.0.0.0",
    port: 9000,
    hot: true,
    onListening: function(server) {
      const port = server.listeningApp.address().port;
      console.log("Listening on port xxxxx:", port);
    },
    writeToDisk: true
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "Output Management"
    }),
    new MiniCssExtractPlugin()
  ],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      /* {
       *   test: /\.worker\.js$/,
       *   use: { loader: "worker-loader" }
       * }, */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(pdf|png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000
            }
          }
        ]
      }
    ]
  }
};
