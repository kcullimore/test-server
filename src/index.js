import "../assets/css/style.css";

import makeImage from "./makeImage";

//import jpgImageUrl from "../assets/img/test.jpg";
//import pngImageUrl from "../assets/img/test.png";
import svgImageUrl from "../assets/img/test.svg";

function component() {
  const element = document.createElement("div");
  // Add the image to our existing div.
  const newImage = makeImage(svgImageUrl);
  element.appendChild(newImage);

  /* const canvas = document.createElement("canvas");
   * canvas.id = "theCanvas";
   * element.appendChild(canvas);
   * // Add the image to our existing div.
   * loadPdf(pdfImageUrl); */

  return element;
}

document.body.appendChild(component());
