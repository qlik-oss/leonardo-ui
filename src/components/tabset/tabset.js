
export default function tabset(options = {}) {
  const {
    element
  } = options;

  const tabs = []; // eslint-disable-line prefer-const


  const activate = (index) => {
    tabs.forEach((tab, i) => {
      if (i === index) {
        tab.element.classList.add('lui-active');
        tab.contentElements.forEach((ce) => {
          ce.style.display = tab.display; // eslint-disable-line no-param-reassign
        });
      } else {
        tab.element.classList.remove('lui-active');
        tab.contentElements.forEach((ce) => {
          ce.style.display = 'none'; // eslint-disable-line no-param-reassign
        });
      }
    });
  };

  const close = () => {
    tabs.forEach(tab => tab.element.removeEventListener('click', tab.listener));
    tabs.splice(0, tabs.length - 1);
  };

  Array.prototype.slice.call(element.querySelectorAll('[data-tab-id]')).forEach((tabElement, index) => {
    const id = tabElement.getAttribute('data-tab-id');

    const listener = tabElement.addEventListener('click', (/* event*/) => {
      activate(index);
    });

    tabs.push({
      id,
      index,
      element: tabElement,
      contentElements: Array.prototype.slice.call(document.querySelectorAll(`[data-tab-content="${id}"]`)),
      display: tabElement.style.display,
      listener
    });
  });

  activate(0);

  return {
    element,
    activate,
    close
  };
}
