import { oppositeDock, positionToElement, positionToCoordinate } from '../../util/positioner';
import { createOverlay } from '../../util/overlay-manager';

const ANIMATE_DELAY = 50;
const ELEM_OFFSET = 10;
const WINDOW_OFFSET = 10;
const EDGE_OFFSET = 10;
let currentId = 0;

const createArrowElement = (posResult) => {
  const elem = document.createElement('div');
  elem.classList.add('lui-tooltip__arrow');
  elem.classList.add(`lui-tooltip__arrow--${oppositeDock(posResult.dock)}`);
  if (posResult.dock === 'top' || posResult.dock === 'bottom') {
    elem.style.left = `${posResult.toPosition.left - posResult.position.left}px`;
  } else {
    elem.style.top = `${posResult.toPosition.top - posResult.position.top}px`;
  }
  return elem;
};

export default function tooltip(options) {
  const {
    alignTo,
    dock,
    content,
  } = options;

  let title;
  let element;
  let containerElement;
  if (typeof content === 'string') {
    const tempContainerElem = document.createElement('div');
    tempContainerElem.innerHTML = content;
    element = tempContainerElem.firstElementChild;
  } else if (content instanceof Element) {
    element = content;
  } else {
    title = alignTo.getAttribute('title');
    if (!title) { // Do not show if the title is empty
      return {
        element: null,
        close: () => {},
      };
    }
    element = document.createElement('div');
    element.appendChild(document.createTextNode(title));
  }

  const id = `lui-tooltip-${++currentId}`;
  const overlay = createOverlay({
    closeOnOutside: false,
    close: (cb) => {
      if (document.body.contains(element)) {
        element.classList.add('lui-fade');
      }

      setTimeout(() => {
        if (alignTo instanceof Element && document.body.contains(alignTo)) {
          if (title) {
            alignTo.setAttribute('title', title);
          }
          alignTo.removeAttribute('aria-describedby');
        }
        cb();
      }, ANIMATE_DELAY);
    },
  });
  containerElement = overlay.element; // eslint-disable-line prefer-const

  element.classList.add('lui-tooltip');
  element.classList.add('lui-fade');
  element.setAttribute('id', id);
  element.setAttribute('role', 'tooltip');

  containerElement.appendChild(element);

  let posResult;
  if (alignTo instanceof Element) {
    posResult = positionToElement(element, alignTo, dock, {
      offset: ELEM_OFFSET,
      minWindowOffset: WINDOW_OFFSET,
      minEdgeOffset: EDGE_OFFSET,
    });
  } else {
    posResult = positionToCoordinate(element, alignTo.top, alignTo.left, dock, {
      offset: ELEM_OFFSET,
      minWindowOffset: WINDOW_OFFSET,
      minEdgeOffset: EDGE_OFFSET,
    });
  }

  containerElement.style.left = `${posResult.position.left}px`;
  containerElement.style.top = `${posResult.position.top}px`;
  containerElement.style.position = 'absolute';

  element.appendChild(createArrowElement(posResult));

  if (title) {
    alignTo.setAttribute('title', '');
  }
  if (alignTo instanceof Element) {
    alignTo.setAttribute('aria-describedby', id);
  }

  overlay.show();

  setTimeout(() => {
    element.classList.remove('lui-fade');
  }, 0);

  return {
    element,
    close: () => {
      overlay.close();
    },
  };
}
