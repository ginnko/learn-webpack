import _ from 'lodash';
import './style.css';
import Commit from './commit.png';
import Data from './data.xml';

function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const myImage = new Image();
  myImage.src = Commit;
  element.appendChild(myImage);

  console.log(Data);
  
  return element;
}

document.body.appendChild(component());