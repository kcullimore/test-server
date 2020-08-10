// import "../assets/css/style.css";

//import "../assets/html/input.html";

// import makeImage from "./makeImage";

//import jpgImageUrl from "../assets/img/test.jpg";
//import pngImageUrl from "../assets/img/test.png";
// import svgImageUrl from "../assets/img/test.svg";

// import calcLayout from "./calcLayout";

// const path = require("path");

// function component() {
//  const layoutScript = document.createElement("script");
//  layoutScript.src = path.join(__dirname, "src", "layout.js");

// Add the image to our existing div.
// const newImage = makeImage(svgImageUrl);
// element.appendChild(newImage);

// calcLayout();
/* const canvas = document.createElement("canvas");
 * canvas.id = "theCanvas";
 * element.appendChild(canvas);
 * // Add the image to our existing div.
 * loadPdf(pdfImageUrl); */

//   return element;
//}

import { spanifyText, writeBox } from "./rUtils.js";

function calculateLayout() {
  spanifyText();
  var body = document.body;
  var csv =
    "BODY,BODY.1," +
    0 +
    "," +
    0 +
    "," +
    body.offsetWidth +
    "," +
    body.offsetHeight +
    "\n";
  var i;
  var children = body.childNodes;
  for (i = 0; i < children.length; i++) {
    csv = csv + writeBox(children[i], i + 1, "BODY.1");
  }
  // Place result in hidden DIV
  /* var result = document.createElement("div");
   * result.innerHTML = csv;
   * result.style.display = "inline";
   * result.id = "layoutEngineRSeleniumresult";
   * body.appendChild(result); */
  return csv;
}

// console.log(layout);
// document.body.appendChild(component());
// const path = require("path");

/* const script = document.createElement("script");
 * script.src = layout.path;
 * document.body.appendChild(script); */

import inputHTML from "../assets/html/input.html";
const element = document.createElement("div");
element.innerHTML = inputHTML;
document.body.appendChild(element);

/* const layoutScriptCall = document.createElement("script");
 * layoutScriptCall.innerHTML = "calculateLayout()";
 * document.body.appendChild(layoutScriptCall); */

let output = calculateLayout();
let ws = new WebSocket("ws://localhost:3000");

ws.onopen = function(e) {
  console.log("Client WS connection established.");
  ws.send(output);
};
// console.log(output);
ws.onmessage = function(message) {
  console.log(message);
};
