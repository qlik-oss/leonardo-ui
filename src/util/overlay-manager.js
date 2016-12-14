const ESCAPE_KEY = 27;

const stack = [];

let keyListener = null;

const addKeyListener = () => {
  keyListener = (event) => {
    if (event.keyCode === ESCAPE_KEY) {
      // Close the dialog on top of the stack
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].closeOnEscape === false) {
          break;
        } else if (stack[i].closeOnEscape === true) {
          stack[i].close();
          break;
        }
      }
    }
  };
  window.addEventListener('keyup', keyListener);
};

export function removeOverlay(overlay) {
  for (let i = 0; i < stack.length; i++) {
    if (overlay === stack[i]) {
      document.body.removeChild(overlay.element);
      stack.splice(i, 1);
      return;
    }
  }
}

export function createOverlay(options = {}) {
  if (!keyListener) {
    addKeyListener();
  }

  const element = document.createElement('div');
  element.style.visibility = 'hidden';
  document.body.appendChild(element);

  const {
    modal = false,
    onClose,
    close,
    closeOnEscape = false,
    closeOnOutside = false
  } = options;

  const overlay = {
    closeOnEscape,
    element,
    show: () => {
      element.style.visibility = '';
    }
  };

  overlay.close = () => {
    close(() => {
      removeOverlay(overlay);
      if (typeof onClose === 'function') {
        onClose();
      }
      if (closeOnOutside) {
        document.removeEventListener('mousedown', overlay.onMouseDown);
        document.removeEventListener('touchstart', overlay.onTouchStart);
      }
    });
  };

  if (closeOnOutside) {
    overlay.onMouseDown = (e) => {
      if (!overlay.element.contains(e.target)) {
        overlay.close();
      }
    };

    overlay.onTouchStart = (e) => {
      if (overlay.element.contains(e.target)) {
        overlay.close();
      }
    };

    document.addEventListener('mousedown', overlay.onMouseDown);
    document.addEventListener('touchstart', overlay.onTouchStart);
  }

  stack.push(overlay);

  const res = {
    element: overlay.element,
    show: overlay.show,
    close: overlay.close
  };

  if (modal) {
    const overlayBGElem = document.createElement('div');
    overlayBGElem.classList.add('lui-modal-background');
    element.appendChild(overlayBGElem);
    res.modalBackgroundElement = overlayBGElem;
  }

  // Return the public API
  return res;
}
