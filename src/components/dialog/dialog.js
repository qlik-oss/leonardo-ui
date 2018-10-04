/* eslint-disable prefer-destructuring */
import { createOverlay } from '../../util/overlay-manager';

const ANIMATE_DELAY = 200;

export default function dialog(options) {
  const {
    content,
    closeOnEscape = true,
    onClose,
  } = options;
  const oldOverflow = document.body.style.overflow;

  let element;
  let containerElement; // eslint-disable-line prefer-const
  let modalBackgroundElement; // eslint-disable-line prefer-const

  const overlay = createOverlay({
    modal: true,
    close: (cb) => {
      if (document.body.contains(containerElement)) {
        element.classList.add('lui-fade');
        modalBackgroundElement.classList.add('lui-fade');
      }
      setTimeout(() => {
        cb();
      }, ANIMATE_DELAY);
    },
    closeOnEscape,
    closeOnOutside: false,
    onClose: () => {
      document.body.style.overflow = oldOverflow;
      if (typeof onClose === 'function') {
        onClose();
      }
    },
  });

  containerElement = overlay.element; // eslint-disable-line prefer-const
  containerElement.classList.add('lui-dialog-container');
  containerElement.setAttribute('role', 'dialog');
  containerElement.style.position = 'fixed';

  modalBackgroundElement = overlay.modalBackgroundElement;

  if (typeof content === 'string') {
    const tempContainerElem = document.createElement('div');
    tempContainerElem.innerHTML = content;
    element = tempContainerElem.firstElementChild;
  } else {
    element = content;
  }
  containerElement.appendChild(element);
  element.setAttribute('role', 'document');
  element.classList.add('lui-fade');
  modalBackgroundElement.classList.add('lui-fade');

  document.body.style.overflow = 'hidden';

  overlay.show();

  setTimeout(() => {
    element.classList.remove('lui-fade');
    modalBackgroundElement.classList.remove('lui-fade');
  }, 0);

  return {
    element,
    close: () => {
      overlay.close();
    },
  };
}
