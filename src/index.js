import _ from 'lodash'
import './css/style.css';
import Diagram from './img/diagram.jpg'

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  
  // Add the image to our existing div.
  const myDiagram = new Image();
  myDiagram.src = Diagram;

  element.appendChild(myDiagram);
  
  return element; 
}

document.body.appendChild(component());
