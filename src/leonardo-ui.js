import dialog from './components/dialog/dialog';
import popover from './components/popover/popover';
import tabset from './components/tabset/tabset';
import tooltip from './components/tooltip/tooltip';

// Import LESS
import './leonardo-ui.less';

// Copy files
/* eslint-disable import/no-extraneous-dependencies, import/imports-first, import/no-unresolved */
import 'file?name=colors.less!./colors.less';
import 'file?name=variables.less!./variables.less';
import 'file?name=lui-icons.ttf!./resources/lui-icons.ttf';
import 'file?name=lui-icons.woff!./resources/lui-icons.woff';

export {
  dialog,
  popover,
  tabset,
  tooltip
};
