(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["leonardoui"] = factory();
	else
		root["leonardoui"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/leonardo-ui/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.tooltip = exports.tabset = exports.popover = exports.dialog = undefined;
	
	var _dialog = __webpack_require__(102);
	
	var _dialog2 = _interopRequireDefault(_dialog);
	
	var _popover = __webpack_require__(104);
	
	var _popover2 = _interopRequireDefault(_popover);
	
	var _tabset = __webpack_require__(106);
	
	var _tabset2 = _interopRequireDefault(_tabset);
	
	var _tooltip = __webpack_require__(107);
	
	var _tooltip2 = _interopRequireDefault(_tooltip);
	
	__webpack_require__(108);
	
	__webpack_require__(110);
	
	__webpack_require__(111);
	
	__webpack_require__(112);
	
	__webpack_require__(113);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Copy files
	/* eslint-disable import/no-extraneous-dependencies, import/imports-first, import/no-unresolved */
	exports.dialog = _dialog2.default;
	exports.popover = _popover2.default;
	exports.tabset = _tabset2.default;
	exports.tooltip = _tooltip2.default;
	
	// Import LESS

/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = dialog;
	
	var _overlayManager = __webpack_require__(103);
	
	var ANIMATE_DELAY = 200;
	
	function dialog(options) {
	  var content = options.content,
	      _options$closeOnEscap = options.closeOnEscape,
	      closeOnEscape = _options$closeOnEscap === undefined ? true : _options$closeOnEscap,
	      _onClose = options.onClose;
	
	  var oldOverflow = document.body.style.overflow;
	
	  var element = void 0;
	  var containerElement = void 0; // eslint-disable-line prefer-const
	  var modalBackgroundElement = void 0; // eslint-disable-line prefer-const
	
	  var overlay = (0, _overlayManager.createOverlay)({
	    modal: true,
	    close: function close(cb) {
	      if (document.body.contains(containerElement)) {
	        element.classList.add('lui-fade');
	        modalBackgroundElement.classList.add('lui-fade');
	      }
	      setTimeout(function () {
	        cb();
	      }, ANIMATE_DELAY);
	    },
	    closeOnEscape: closeOnEscape,
	    closeOnOutside: false,
	    onClose: function onClose() {
	      document.body.style.overflow = oldOverflow;
	      if (typeof _onClose === 'function') {
	        _onClose();
	      }
	    }
	  });
	
	  containerElement = overlay.element; // eslint-disable-line prefer-const
	  containerElement.classList.add('lui-dialog-container');
	  containerElement.setAttribute('role', 'dialog');
	  containerElement.style.position = 'fixed';
	
	  modalBackgroundElement = overlay.modalBackgroundElement;
	
	  if (typeof content === 'string') {
	    var tempContainerElem = document.createElement('div');
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
	
	  setTimeout(function () {
	    element.classList.remove('lui-fade');
	    modalBackgroundElement.classList.remove('lui-fade');
	  }, 0);
	
	  return {
	    element: element,
	    close: function close() {
	      overlay.close();
	    }
	  };
	}

/***/ }),

/***/ 103:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeOverlay = removeOverlay;
	exports.createOverlay = createOverlay;
	var ESCAPE_KEY = 27;
	
	var stack = [];
	
	var keyListener = null;
	
	var addKeyListener = function addKeyListener() {
	  keyListener = function keyListener(event) {
	    if (event.keyCode === ESCAPE_KEY) {
	      // Close the dialog on top of the stack
	      for (var i = stack.length - 1; i >= 0; i--) {
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
	
	function removeOverlay(overlay) {
	  for (var i = 0; i < stack.length; i++) {
	    if (overlay === stack[i]) {
	      document.body.removeChild(overlay.element);
	      stack.splice(i, 1);
	      return;
	    }
	  }
	}
	
	function createOverlay() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  if (!keyListener) {
	    addKeyListener();
	  }
	
	  var element = document.createElement('div');
	  element.style.visibility = 'hidden';
	  document.body.appendChild(element);
	
	  var _options$modal = options.modal,
	      modal = _options$modal === undefined ? false : _options$modal,
	      onClose = options.onClose,
	      close = options.close,
	      _options$closeOnEscap = options.closeOnEscape,
	      closeOnEscape = _options$closeOnEscap === undefined ? false : _options$closeOnEscap,
	      _options$closeOnOutsi = options.closeOnOutside,
	      closeOnOutside = _options$closeOnOutsi === undefined ? false : _options$closeOnOutsi;
	
	
	  var overlay = {
	    closeOnEscape: closeOnEscape,
	    element: element,
	    show: function show() {
	      element.style.visibility = '';
	    }
	  };
	
	  overlay.close = function () {
	    close(function () {
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
	    overlay.onMouseDown = function (e) {
	      if (!overlay.element.contains(e.target)) {
	        overlay.close();
	      }
	    };
	
	    overlay.onTouchStart = function (e) {
	      if (overlay.element.contains(e.target)) {
	        overlay.close();
	      }
	    };
	
	    document.addEventListener('mousedown', overlay.onMouseDown);
	    document.addEventListener('touchstart', overlay.onTouchStart);
	  }
	
	  stack.push(overlay);
	
	  var res = {
	    element: overlay.element,
	    show: overlay.show,
	    close: overlay.close
	  };
	
	  if (modal) {
	    var overlayBGElem = document.createElement('div');
	    overlayBGElem.classList.add('lui-modal-background');
	    element.appendChild(overlayBGElem);
	    res.modalBackgroundElement = overlayBGElem;
	  }
	
	  // Return the public API
	  return res;
	}

/***/ }),

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = popover;
	
	var _positioner = __webpack_require__(105);
	
	var _overlayManager = __webpack_require__(103);
	
	var ANIMATE_DELAY = 200;
	var ELEM_OFFSET = 10;
	var WINDOW_OFFSET = 10;
	var EDGE_OFFSET = 10;
	
	var currentId = 0;
	
	var createArrowElement = function createArrowElement(posResult) {
	  var elem = document.createElement('div');
	  elem.classList.add('lui-popover__arrow');
	  elem.classList.add('lui-popover__arrow--' + (0, _positioner.oppositeDock)(posResult.dock));
	  if (posResult.dock === 'top' || posResult.dock === 'bottom') {
	    elem.style.left = posResult.toPosition.left - posResult.position.left + 'px';
	  } else {
	    elem.style.top = posResult.toPosition.top - posResult.position.top + 'px';
	  }
	  return elem;
	};
	
	function popover() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var _options$closeOnEscap = options.closeOnEscape,
	      closeOnEscape = _options$closeOnEscap === undefined ? true : _options$closeOnEscap,
	      _options$dock = options.dock,
	      dock = _options$dock === undefined ? 'bottom' : _options$dock,
	      alignTo = options.alignTo,
	      content = options.content,
	      _onClose = options.onClose;
	
	
	  var containerElement = void 0;
	  var element = void 0;
	
	  var overlay = (0, _overlayManager.createOverlay)({
	    modal: false,
	    close: function close(cb) {
	      if (document.body.contains(element)) {
	        element.classList.add('lui-fade');
	      }
	      setTimeout(function () {
	        cb();
	      }, ANIMATE_DELAY);
	    },
	    closeOnEscape: closeOnEscape,
	    closeOnOutside: true,
	    onClose: function onClose() {
	      if (typeof _onClose === 'function') {
	        _onClose();
	      }
	      if (alignTo instanceof Element && document.body.contains(alignTo)) {
	        alignTo.setAttribute('aria-expanded', 'false');
	        alignTo.removeAttribute('aria-controls');
	      }
	    }
	  });
	
	  containerElement = overlay.element; // eslint-disable-line prefer-const
	
	  if (typeof content === 'string') {
	    var tempContainerElem = document.createElement('div');
	    tempContainerElem.innerHTML = content;
	    element = tempContainerElem.firstElementChild;
	  } else {
	    element = content;
	  }
	  containerElement.appendChild(element);
	
	  var id = 'lui-popover-' + ++currentId;
	  element.setAttribute('id', id);
	  element.setAttribute('role', 'dialog');
	  element.classList.add('lui-fade');
	
	  var posResult = void 0;
	  if (alignTo instanceof Element) {
	    posResult = (0, _positioner.positionToElement)(element, alignTo, dock, {
	      offset: ELEM_OFFSET,
	      minWindowOffset: WINDOW_OFFSET,
	      minEdgeOffset: EDGE_OFFSET
	    });
	    alignTo.setAttribute('aria-controls', id);
	    alignTo.setAttribute('aria-expanded', 'true');
	  } else {
	    posResult = (0, _positioner.positionToCoordinate)(element, alignTo.top, alignTo.left, dock, {
	      offset: ELEM_OFFSET,
	      minWindowOffset: WINDOW_OFFSET,
	      minEdgeOffset: EDGE_OFFSET
	    });
	  }
	  containerElement.style.left = posResult.position.left + 'px';
	  containerElement.style.top = posResult.position.top + 'px';
	  containerElement.style.position = 'absolute';
	
	  element.appendChild(createArrowElement(posResult));
	
	  overlay.show();
	
	  setTimeout(function () {
	    element.classList.remove('lui-fade');
	  }, 0);
	
	  return {
	    element: element,
	    close: function close() {
	      overlay.close();
	    }
	  };
	}

/***/ }),

/***/ 105:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.oppositeDock = oppositeDock;
	exports.createRect = createRect;
	exports.getDockCenterPoint = getDockCenterPoint;
	exports.tryPosition = tryPosition;
	exports.createTryRect = createTryRect;
	exports.tryDock = tryDock;
	exports.positionToRect = positionToRect;
	exports.positionToElement = positionToElement;
	exports.positionToCoordinate = positionToCoordinate;
	/* eslint-disable no-mixed-operators */
	
	var oppositeDockMap = {
	  top: 'bottom',
	  right: 'left',
	  bottom: 'top',
	  left: 'right'
	};
	
	function oppositeDock(dock) {
	  return oppositeDockMap[dock];
	}
	
	function createRect() {
	  var top = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	  var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
	
	  return {
	    top: top,
	    right: left + width,
	    bottom: top + height,
	    left: left,
	    width: width,
	    height: height
	  };
	}
	
	function getDockCenterPoint(rect, dock) {
	  var top = void 0;
	  var left = void 0;
	  if (dock === 'top') {
	    top = rect.top;
	    left = rect.left + rect.width / 2;
	  } else if (dock === 'right') {
	    top = rect.top + rect.height / 2;
	    left = rect.right;
	  } else if (dock === 'left') {
	    top = rect.top + rect.height / 2;
	    left = rect.left;
	  } else {
	    top = rect.bottom;
	    left = rect.left + rect.width / 2;
	  }
	  return {
	    top: top,
	    left: left
	  };
	}
	
	function tryPosition(rect, withinRect) {
	  var left = rect.left >= withinRect.left;
	  var right = rect.right <= withinRect.right;
	  var top = rect.top >= withinRect.top;
	  var bottom = rect.bottom <= withinRect.bottom;
	
	  return {
	    left: left,
	    right: right,
	    top: top,
	    bottom: bottom
	  };
	}
	
	function createTryRect(elemRect, toPosition, dock, offset) {
	  var top = void 0;
	  var left = void 0;
	  if (dock === 'top') {
	    top = toPosition.top - elemRect.height - offset;
	    left = toPosition.left - elemRect.width / 2;
	  } else if (dock === 'right') {
	    top = toPosition.top - elemRect.height / 2;
	    left = toPosition.left + offset;
	  } else if (dock === 'left') {
	    top = toPosition.top - elemRect.height / 2;
	    left = toPosition.left - elemRect.width - offset;
	  } else {
	    top = toPosition.top + offset;
	    left = toPosition.left - elemRect.width / 2;
	  }
	
	  return createRect(top, left, elemRect.width, elemRect.height);
	}
	
	function tryDock(elemRect, alignToRect, windowRect, dock) {
	  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	  var _options$offset = options.offset,
	      offset = _options$offset === undefined ? 0 : _options$offset,
	      _options$minWindowOff = options.minWindowOffset,
	      minWindowOffset = _options$minWindowOff === undefined ? 0 : _options$minWindowOff,
	      _options$minEdgeOffse = options.minEdgeOffset,
	      minEdgeOffset = _options$minEdgeOffse === undefined ? 0 : _options$minEdgeOffse;
	
	
	  var windowOffsetRect = createRect(windowRect.top + minWindowOffset, windowRect.left + minWindowOffset, windowRect.width - minWindowOffset * 2, windowRect.height - minWindowOffset * 2);
	
	  var toPosition = getDockCenterPoint(alignToRect, dock);
	  var tryRect = createTryRect(elemRect, toPosition, dock, offset);
	  var fitResult = tryPosition(tryRect, windowOffsetRect);
	  if (dock === 'top' || dock === 'bottom') {
	    if (!fitResult.left) {
	      tryRect.left = Math.min(windowOffsetRect.left, toPosition.left - minEdgeOffset);
	      tryRect.right = tryRect.left + tryRect.width;
	      fitResult = tryPosition(tryRect, windowOffsetRect);
	    }
	    if (!fitResult.right) {
	      tryRect.right = Math.max(windowOffsetRect.right, toPosition.left + minEdgeOffset);
	      tryRect.left = tryRect.right - tryRect.width;
	      fitResult = tryPosition(tryRect, windowOffsetRect);
	    }
	  } else {
	    if (!fitResult.top) {
	      tryRect.top = Math.min(windowOffsetRect.top, toPosition.top - minEdgeOffset);
	      tryRect.bottom = tryRect.top + tryRect.height;
	      fitResult = tryPosition(tryRect, windowOffsetRect);
	    }
	    if (!fitResult.bottom) {
	      tryRect.bottom = Math.max(windowOffsetRect.bottom, toPosition.top + minWindowOffset);
	      tryRect.top = tryRect.bottom - tryRect.height;
	      fitResult = tryPosition(tryRect, windowOffsetRect);
	    }
	  }
	
	  return {
	    fits: fitResult.top && fitResult.right && fitResult.bottom && fitResult.left,
	    dock: dock,
	    position: {
	      left: tryRect.left,
	      top: tryRect.top
	    },
	    toPosition: getDockCenterPoint(alignToRect, dock)
	  };
	}
	
	function positionToRect(element, rect) {
	  var dock = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bottom';
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	  var elemRect = element.getBoundingClientRect();
	  var windowRect = createRect(0, 0, document.body.scrollWidth, document.body.scrollHeight);
	
	  var docks = Array.isArray(dock) ? dock : [dock];
	  var firstResult = null;
	  for (var i = 0; i < docks.length; i++) {
	    var result = tryDock(elemRect, rect, windowRect, docks[i], options);
	    if (result.fits) {
	      return result;
	    }
	    if (i === 0) {
	      firstResult = result;
	    }
	  }
	  // If no fit is found - return the first position
	  return firstResult;
	}
	
	function positionToElement(element, alignToElement) {
	  var dock = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'bottom';
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	  var elementRect = alignToElement.getBoundingClientRect();
	
	  var body = document.body;
	  var docEl = document.documentElement;
	
	  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
	  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
	
	  var clientTop = docEl.clientTop || body.clientTop || 0;
	  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
	
	  var top = elementRect.top + scrollTop - clientTop;
	  var left = elementRect.left + scrollLeft - clientLeft;
	
	  var itemRect = createRect(top, left, elementRect.width, elementRect.height);
	
	  return positionToRect(element, itemRect, dock, options);
	}
	
	function positionToCoordinate(element, x, y) {
	  var dock = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'bottom';
	  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
	
	  var rect = {
	    top: y,
	    bottom: y,
	    left: x,
	    right: x,
	    width: 0,
	    height: 0
	  };
	  return positionToRect(element, rect, dock, options);
	}

/***/ }),

/***/ 106:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = tabset;
	function tabset() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var element = options.element;
	
	
	  var tabs = []; // eslint-disable-line prefer-const
	
	
	  var activate = function activate(index) {
	    tabs.forEach(function (tab, i) {
	      if (i === index) {
	        tab.element.classList.add('lui-active');
	        tab.contentElements.forEach(function (ce) {
	          ce.style.display = tab.display; // eslint-disable-line no-param-reassign
	        });
	      } else {
	        tab.element.classList.remove('lui-active');
	        tab.contentElements.forEach(function (ce) {
	          ce.style.display = 'none'; // eslint-disable-line no-param-reassign
	        });
	      }
	    });
	  };
	
	  var close = function close() {
	    tabs.forEach(function (tab) {
	      return tab.element.removeEventListener('click', tab.listener);
	    });
	    tabs.splice(0, tabs.length - 1);
	  };
	
	  Array.prototype.slice.call(element.querySelectorAll('[data-tab-id]')).forEach(function (tabElement, index) {
	    var id = tabElement.getAttribute('data-tab-id');
	
	    var listener = tabElement.addEventListener('click', function () /* event*/{
	      activate(index);
	    });
	
	    tabs.push({
	      id: id,
	      index: index,
	      element: tabElement,
	      contentElements: Array.prototype.slice.call(document.querySelectorAll('[data-tab-content="' + id + '"]')),
	      display: tabElement.style.display,
	      listener: listener
	    });
	  });
	
	  activate(0);
	
	  return {
	    element: element,
	    activate: activate,
	    close: close
	  };
	}

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = tooltip;
	
	var _positioner = __webpack_require__(105);
	
	var _overlayManager = __webpack_require__(103);
	
	var ANIMATE_DELAY = 50;
	var ELEM_OFFSET = 10;
	var WINDOW_OFFSET = 10;
	var EDGE_OFFSET = 10;
	var currentId = 0;
	
	var createArrowElement = function createArrowElement(posResult) {
	  var elem = document.createElement('div');
	  elem.classList.add('lui-tooltip__arrow');
	  elem.classList.add('lui-tooltip__arrow--' + (0, _positioner.oppositeDock)(posResult.dock));
	  if (posResult.dock === 'top' || posResult.dock === 'bottom') {
	    elem.style.left = posResult.toPosition.left - posResult.position.left + 'px';
	  } else {
	    elem.style.top = posResult.toPosition.top - posResult.position.top + 'px';
	  }
	  return elem;
	};
	
	function tooltip(options) {
	  var alignTo = options.alignTo,
	      dock = options.dock,
	      content = options.content;
	
	
	  var title = void 0;
	  var element = void 0;
	  var containerElement = void 0;
	  if (typeof content === 'string') {
	    var tempContainerElem = document.createElement('div');
	    tempContainerElem.innerHTML = content;
	    element = tempContainerElem.firstElementChild;
	  } else if (content instanceof Element) {
	    element = content;
	  } else {
	    title = alignTo.getAttribute('title');
	    if (!title) {
	      // Do not show if the title is empty
	      return {
	        element: null,
	        close: function close() {}
	      };
	    }
	    element = document.createElement('div');
	    element.appendChild(document.createTextNode(title));
	  }
	
	  var id = 'lui-tooltip-' + ++currentId;
	  var overlay = (0, _overlayManager.createOverlay)({
	    closeOnOutside: false,
	    close: function close(cb) {
	      if (document.body.contains(element)) {
	        element.classList.add('lui-fade');
	      }
	
	      setTimeout(function () {
	        if (alignTo instanceof Element && document.body.contains(alignTo)) {
	          if (title) {
	            alignTo.setAttribute('title', title);
	          }
	          alignTo.removeAttribute('aria-describedby');
	        }
	        cb();
	      }, ANIMATE_DELAY);
	    }
	  });
	  containerElement = overlay.element; // eslint-disable-line prefer-const
	
	  element.classList.add('lui-tooltip');
	  element.classList.add('lui-fade');
	  element.setAttribute('id', id);
	  element.setAttribute('role', 'tooltip');
	
	  containerElement.appendChild(element);
	
	  var posResult = void 0;
	  if (alignTo instanceof Element) {
	    posResult = (0, _positioner.positionToElement)(element, alignTo, dock, {
	      offset: ELEM_OFFSET,
	      minWindowOffset: WINDOW_OFFSET,
	      minEdgeOffset: EDGE_OFFSET
	    });
	  } else {
	    posResult = (0, _positioner.positionToCoordinate)(element, alignTo.top, alignTo.left, dock, {
	      offset: ELEM_OFFSET,
	      minWindowOffset: WINDOW_OFFSET,
	      minEdgeOffset: EDGE_OFFSET
	    });
	  }
	
	  containerElement.style.left = posResult.position.left + 'px';
	  containerElement.style.top = posResult.position.top + 'px';
	  containerElement.style.position = 'absolute';
	
	  element.appendChild(createArrowElement(posResult));
	
	  if (title) {
	    alignTo.setAttribute('title', '');
	  }
	  if (alignTo instanceof Element) {
	    alignTo.setAttribute('aria-describedby', id);
	  }
	
	  overlay.show();
	
	  setTimeout(function () {
	    element.classList.remove('lui-fade');
	  }, 0);
	
	  return {
	    element: element,
	    close: function close() {
	      overlay.close();
	    }
	  };
	}

/***/ }),

/***/ 108:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "colors.less";

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "variables.less";

/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "lui-icons.ttf";

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "lui-icons.woff";

/***/ })

/******/ })
});
;
//# sourceMappingURL=leonardo-ui.js.map