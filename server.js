// Express setup
const express = require("express");
const body = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

// Webpack setup
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config.js");
const compiler = webpack(config);

// Constants
const PORT = 3000;
const PUBLIC = path.join(__dirname, "public");
const DIST_DIR = path.join(__dirname, "./dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    path: config.output.path
  })
);

app.use(cors());
app.use(body.urlencoded({ extended: true }));
app.use(body.json());
app.use(express.static(PUBLIC));

/* app.get("/output", (req, res) => {
 *   res.sendFile(HTML_FILE);
 * }); */

// Serve the files on port 3000.
app.listen(PORT, function() {
  console.log(`Server listening on http://localhost:${PORT}\n`);
});
