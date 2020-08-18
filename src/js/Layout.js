import { calculateLayout } from "./layoutUtils.js";
import inputHTML from "../html/input.html";

const element = document.createElement("div");
element.innerHTML = inputHTML;
document.body.appendChild(element);

let output = calculateLayout(document);

let ws = new WebSocket("ws://localhost:3000");

ws.onopen = function(e) {
  console.log("Client WS connection established.");
  ws.send(output);
};
// console.log(output);
ws.onmessage = function(message) {
  console.log(message);
};
