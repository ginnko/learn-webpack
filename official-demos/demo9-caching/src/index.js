import _ from 'lodash';
import print from './print';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.onclick = print.bind(null, 'Hello World!');

  return element;
}

document.body.appendChild(component());