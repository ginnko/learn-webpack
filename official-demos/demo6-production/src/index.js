import { cube } from './math.js';

function common() {
  const element = document.createElement('div');
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5),
    'haha'
  ].join('\n\n');
  return element;
}

document.body.appendChild(common());
