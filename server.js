// Express setup
const express = require("express");
const body = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

// Webpack setup
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("./webpack.config.js");
const compiler = webpack(config);

// Websocket Server
const WebSocket = require("ws");

const app = express();
const PORT = 3000;
const DIST_DIR = path.join(__dirname, "./dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const UPLOADS = path.join(__dirname, "/src/uploads");
// SET STORAGE
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, UPLOADS);
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});

let upload = multer({ storage: storage });

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    path: config.output.path
  })
);

app.use(cors());
app.use(body.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));

app.get("/api", (req, res) => {
  res.send({
    foo: "bar",
    bar: "foo"
  });
});
app.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});

app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

// Serve the files on port 3000.
const server = app.listen(PORT, function() {
  console.log(`WS Server listening on http://localhost:${PORT}\n`);
});

const wss = new WebSocket.Server({ server });
wss.on("connection", ws => {
  ws.on("open", function open() {
    console.log("Server WS connection established.");
  });
  ws.on("message", message => {
    console.log(`Received message.`);
    fs.writeFileSync(path.join(__dirname, "test.txt"), message);
  });
  ws.send("ho!");
});
