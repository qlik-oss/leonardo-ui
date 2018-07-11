/* eslint import/no-extraneous-dependencies:0,no-var:0,vars-on-top:0 */

const fs = require('fs');
const path = require('path');

const glob = require('glob');
const less = require('less');
const Handlebars = require('handlebars');

const sections = require('./src/components.json');
const fileUtil = require('../tools/file-util');

const LUI_VERSION = require('../package.json').version;

const docsDir = path.resolve(__dirname);

function indent(text) {
  const lines = text.split('\n');
  var indentation = 1000;
  lines.forEach((line) => {
    if (!line) {
      return;
    }
    var numSpaces = 0;
    for (var i = 0; i < line.length; i++) {
      if (line[i] === ' ') {
        numSpaces = i + 1;
      } else {
        break;
      }
    }
    if (numSpaces < indentation) {
      indentation = numSpaces;
    }
  });

  if (indentation !== 1000) {
    var regex = '^';
    for (var i = 0; i < indentation; i++) {
      regex += ' ';
    }
    const indentedText = text.replace(new RegExp(regex, 'gm'), '');
    return indentedText;// .replace(/\t/g, '    ');
  }

  return text;
}

Handlebars.registerHelper('example', (options) => {
  const result = `<div class='example'>${
    options.fn()
  }</div>`;
  return result;
});

Handlebars.registerHelper('example-code', (options) => {
  const indentedContent = indent(options.fn());
  const content = Handlebars.escapeExpression(indentedContent);
  const result = `<div class='example-code  has-border'><pre><code class='html'>${
    content
  }</code></pre></div>`;
  return result;
});

Handlebars.registerHelper('example-tabset', (options) => {
  const result = `<div class="example-tabset">
      <ul class="lui-tabset" data-tabset>
        ${options.fn()}
      </ul>
    </div>`;
  return result;
});

Handlebars.registerHelper('example-tab', (id, options) => {
  const result = `<li class="lui-tab" data-tab-id="${id}">
      <span class="lui-tab__text">
        ${options.fn()}
      </span>
    </li>`;
  return result;
});

Handlebars.registerHelper('example-tab-content', (id, options) => {
  var clazz = 'example-box';
  if (id.indexOf('inverse') > -1) {
    clazz += ' lui-bg-inverse';
  }

  var exampleStyle = '';
  if (id === 'js') {
    exampleStyle = 'display: none;';
  }

  const result = `<div data-tab-content="${id}" style="display: none;">
      <div class="${clazz}" style="${exampleStyle}">
        ${options.fn()}
      </div>
      <div class="example-code">
        ${Handlebars.helpers['example-code'](options)}
      </div>
    </div>`;
  return result;
});

Handlebars.registerHelper('icon', (options) => {
  const content = options.fn();
  const result = `<div class='icon-box'>
      <div class='icon-example'>
        <span class='lui-icon ${content}'></span>
      </div>
      <div class='icon-text'>
        <div>lui-icon</div>
        <div>${content}</div>
      </div>
    </div>`;
  return result;
});

Handlebars.registerHelper('color', (options) => {
  const content = options.fn().split('|');
  const name = content[0];
  const hex = content[1];
  const textColorClass = content[2];
  const result = `<div class='color-box ${textColorClass}' style='background:${hex}'>
      <div class='color-name'>${name}</div>
      <div class='color-hex'>${hex}</div>
    </div>`;
  return result;
});

function compileLess() {
  const lessContent = fs.readFileSync(path.resolve(docsDir, 'src/docs.less'), {
    encoding: 'utf8'
  });
  less.render(
    lessContent,
    {
      paths: [path.resolve(__dirname, '../src')],
      filename: 'docs.css'
    },
    (e1, output) => {
      if (e1) {
        console.log('Docs: failed to compile less:', e1); // eslint-disable-line no-console
      } else {
        try {
          fs.writeFileSync(path.resolve(docsDir, 'dist/styles/docs.css'), output.css);
        } catch (e2) {
          console.log('Docs: failed to compile less:', e2); // eslint-disable-line no-console
        }
      }
    }
  );
}

// Compile Handlebars templates
function compileTemplates() {
  const mainHtml = fs.readFileSync(path.resolve(docsDir, 'src/template.html'), {
    encoding: 'utf8'
  });
  const mainTemplate = Handlebars.compile(mainHtml);

  function createPage(fileName, tab, content) {
    const html = mainTemplate({
      tabs: [{
        title: 'Get started',
        url: 'get-started.html',
        selected: tab === 'get-started'
      }, {
        title: 'Components',
        url: 'components.html',
        selected: tab === 'components'
      }],
      content,
      luiVersion: LUI_VERSION
    });
    fileUtil.writeFile(path.resolve(docsDir, 'dist', fileName), html);
  }

  function createIndexPage() {
    const content = fs.readFileSync(path.resolve(docsDir, 'src/pages/index.html'), {
      encoding: 'utf8'
    });
    const template = Handlebars.compile(content);
    const html = template();
    return createPage('index.html', 'index', html);
  }

  function createGetStartedPage() {
    const content = fs.readFileSync(path.resolve(docsDir, 'src/pages/get-started.html'), {
      encoding: 'utf8'
    });
    const template = Handlebars.compile(content);
    const html = template({
      luiVersion: LUI_VERSION
    });
    return createPage('get-started.html', 'get-started', html);
  }

  function createComponentPage(templateName, template, tab, content) {
    return createPage(templateName, tab, template({
      content,
      sections: sections.map(section => ({
        name: section.name,
        pages: section.pages.map(page => ({
          name: page.name,
          template: page.template,
          selected: page.template === templateName
        }))
      }))
    }));
  }

  function createComponentPages() {
    const componentHtml = fs.readFileSync(path.resolve(docsDir, 'src/component-template.html'), {
      encoding: 'utf8'
    });
    const componentTemplate = Handlebars.compile(componentHtml);

    sections.forEach((section) => {
      section.pages.forEach((page) => {
        const file = `src/pages/${page.template}`;
        const fileContent = fs.readFileSync(path.resolve(docsDir, file), {
          encoding: 'utf8'
        });

        const template = Handlebars.compile(fileContent);
        const html = template();

        createComponentPage(page.template, componentTemplate, 'components', html);
      });
    });

    const file = 'src/pages/components.html';
    const fileContent = fs.readFileSync(path.resolve(docsDir, file), {
      encoding: 'utf8'
    });
    createComponentPage('components.html', componentTemplate, 'components', fileContent);
  }

  createIndexPage();
  createGetStartedPage();
  createComponentPages();
}

// Copy external libraries and images
function copyResources() {
  // Source code deps
  fileUtil.copyFile(path.resolve(docsDir, '../dist/leonardo-ui.js'), path.resolve(docsDir, 'dist/leonardo-ui/leonardo-ui.js'));
  fileUtil.copyFile(path.resolve(docsDir, '../dist/leonardo-ui.js.map'), path.resolve(docsDir, 'dist/leonardo-ui/leonardo-ui.js.map'));
  fileUtil.copyFile(path.resolve(docsDir, '../dist/leonardo-ui.css'), path.resolve(docsDir, 'dist/leonardo-ui/leonardo-ui.css'));
  fileUtil.copyFile(path.resolve(docsDir, '../dist/leonardo-ui.css.map'), path.resolve(docsDir, 'dist/leonardo-ui/leonardo-ui.css.map'));
  fileUtil.copyFile(path.resolve(docsDir, '../dist/lui-icons.ttf'), path.resolve(docsDir, 'dist/leonardo-ui/lui-icons.ttf'));
  fileUtil.copyFile(path.resolve(docsDir, '../dist/lui-icons.woff'), path.resolve(docsDir, 'dist/leonardo-ui/lui-icons.woff'));

  // Doc files
  glob.sync(`${path.resolve(docsDir, 'src/img')}/**.*`).forEach((file) => {
    const folder = path.resolve(docsDir, 'src/img/').replace(/\\/g, '/'); // Because glob uses forward slashes on all paths
    const fileName = file.replace(folder, '');
    fileUtil.copyFile(file, path.resolve(docsDir, `dist/resources/${fileName}`));
  });
}

function createDirectories() {
  fileUtil.ensureDir(path.resolve(docsDir, 'dist'));
  fileUtil.ensureDir(path.resolve(docsDir, 'dist/leonardo-ui'));
  fileUtil.ensureDir(path.resolve(docsDir, 'dist/resources'));
  fileUtil.ensureDir(path.resolve(docsDir, 'dist/js'));
  fileUtil.ensureDir(path.resolve(docsDir, 'dist/styles'));
}

function buildAll() {
  createDirectories();
  compileLess();
  compileTemplates();
  copyResources();
}

module.exports = {
  compileLess,
  compileTemplates,
  copyResources,
  createDirectories,
  buildAll
};
