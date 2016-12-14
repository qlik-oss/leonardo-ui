import { oppositeDock, positionToElement, positionToCoordinate } from '../../util/positioner';
import { createOverlay } from '../../util/overlay-manager';

const ANIMATE_DELAY = 200;
const ELEM_OFFSET = 10;
const WINDOW_OFFSET = 10;
const EDGE_OFFSET = 10;

let currentId = 0;

const createArrowElement = (posResult) => {
  const elem = document.createElement('div');
  elem.classList.add('lui-popover__arrow');
  elem.classList.add(`lui-popover__arrow--${oppositeDock(posResult.dock)}`);
  if (posResult.dock === 'top' || posResult.dock === 'bottom') {
    elem.style.left = `${posResult.toPosition.left - posResult.position.left}px`;
  } else {
    elem.style.top = `${posResult.toPosition.top - posResult.position.top}px`;
  }
  return elem;
};

export default function popover(options = {}) {
  const {
    closeOnEscape = true,
    dock = 'bottom',
    alignTo,
    content,
    onClose
  } = options;

  let containerElement;
  let element;

  const overlay = createOverlay({
    modal: false,
    close: (cb) => {
      if (document.body.contains(element)) {
        element.classList.add('lui-fade');
      }
      setTimeout(() => {
        cb();
      }, ANIMATE_DELAY);
    },
    closeOnEscape,
    closeOnOutside: true,
    onClose: () => {
      if (typeof onClose === 'function') {
        onClose();
      }
      if (alignTo instanceof Element && document.body.contains(alignTo)) {
        alignTo.setAttribute('aria-expanded', 'false');
        alignTo.removeAttribute('aria-controls');
      }
    }
  });

  containerElement = overlay.element; // eslint-disable-line prefer-const

  if (typeof content === 'string') {
    const tempContainerElem = document.createElement('div');
    tempContainerElem.innerHTML = content;
    element = tempContainerElem.firstElementChild;
  } else {
    element = content;
  }
  containerElement.appendChild(element);

  const id = `lui-popover-${++currentId}`;
  element.setAttribute('id', id);
  element.setAttribute('role', 'dialog');
  element.classList.add('lui-fade');

  let posResult;
  if (alignTo instanceof Element) {
    posResult = positionToElement(element, alignTo, dock, {
      offset: ELEM_OFFSET,
      minWindowOffset: WINDOW_OFFSET,
      minEdgeOffset: EDGE_OFFSET
    });
    alignTo.setAttribute('aria-controls', id);
    alignTo.setAttribute('aria-expanded', 'true');
  } else {
    posResult = positionToCoordinate(element, alignTo.top, alignTo.left, dock, {
      offset: ELEM_OFFSET,
      minWindowOffset: WINDOW_OFFSET,
      minEdgeOffset: EDGE_OFFSET
    });
  }
  containerElement.style.left = `${posResult.position.left}px`;
  containerElement.style.top = `${posResult.position.top}px`;
  containerElement.style.position = 'absolute';

  element.appendChild(createArrowElement(posResult));

  overlay.show();

  setTimeout(() => {
    element.classList.remove('lui-fade');
  }, 0);

  return {
    element,
    close: () => {
      overlay.close();
    }
  };
}
