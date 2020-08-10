import makeImage from "./makeImage";
import jpgImageUrl from "../assets/img/test.jpg";
// import pngImageUrl from "../assets/img/test.png";
// import svgImageUrl from "../assets/img/test.svg";

const imageInputUrl = jpgImageUrl;
// const imageInputUrl = pngImageUrl
// const imageInputUrl = svgImageUrl

export default function component(document) {
  const element = document.createElement("div");

  // Add the image to our existing div.
  const newImage = makeImage(imageInputUrl);
  element.appendChild(newImage);

  return element;
}
