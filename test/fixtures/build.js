/* eslint no-var:0 */

const fs = require('fs');
const path = require('path');

const glob = require('glob');
const extend = require('extend');
const Handlebars = require('handlebars');

const fileUtil = require('../../tools/file-util');

const components = require('./src/components');

const testDir = path.resolve(__dirname, '../');
const distDir = path.resolve(__dirname, '../../dist');
const fixtureSrcDir = path.resolve(__dirname, 'src');
const fixtureDistDir = path.resolve(__dirname, 'dist');

const template = fs.readFileSync(path.resolve(fixtureSrcDir, 'template.html'), {
  encoding: 'utf8'
});
const fixtureTemplate = Handlebars.compile(template);

const overview = fs.readFileSync(path.resolve(fixtureSrcDir, 'overview-template.html'), {
  encoding: 'utf8'
});
const overviewTemplate = Handlebars.compile(overview);

Handlebars.registerHelper('type', function typeHelper(t, o) {
  var type;
  var options;
  if (typeof o === 'undefined') {
    // type is options
    options = t;
  } else {
    type = t;
    options = o;
  }
  if (type === options.data.root.type) {
    return options.fn(this);
  }
  return null;
});

function buildFixturesOverview(fixtures) {
  const components = Object.keys(fixtures).map(componentName => ({
    name: componentName,
    fixtures: fixtures[componentName].map(fixtureKey => ({
      key: fixtureKey
    }))
  }));

  const fixtureHtml = overviewTemplate({
    components
  });

  const outPath = path.resolve(fixtureDistDir, 'fixtures.html');
  fs.writeFileSync(outPath, fixtureHtml);
}

function buildFixturesFor(component, json, html) {
  const outDir = path.resolve(fixtureDistDir, component);
  fileUtil.ensureDir(outDir);

  const defaults = json.defaults || {};
  const fixtures = [];

  Object.keys(json.fixtures).forEach((key) => {
    const variables = extend(true, {}, defaults, json.fixtures[key]);

    const contentTemplate = Handlebars.compile(html);
    const contentHtml = contentTemplate(variables);

    const fixtureHtml = fixtureTemplate({
      content: contentHtml
    });

    const outPath = path.join(outDir, `${key}.html`);
    fs.writeFileSync(outPath, fixtureHtml);

    fixtures.push(key);
  });

  return fixtures;
}

// Compile Handlebars templates
function buildFixtures() {
  const fixtures = {};

  components.forEach((component) => {
    const dir = path.resolve(fixtureSrcDir, component);

    const jsonFile = path.resolve(dir, `${component}.json`);
    const jsonContent = JSON.parse(fs.readFileSync(jsonFile, { encoding: 'utf8' }));

    const htmlFile = path.resolve(dir, `${component}.html`);
    const htmlContent = fs.readFileSync(htmlFile, { encoding: 'utf8' });

    fixtures[component] = buildFixturesFor(component, jsonContent, htmlContent);
  });

  fs.writeFileSync(path.resolve(fixtureDistDir, 'fixtures.json'), JSON.stringify(fixtures));

  return fixtures;
}

function buildIconFontCSS() {
  const iconFontPath = path.resolve(distDir, 'lui-icons.ttf');
  const content = fs.readFileSync(iconFontPath).toString('base64');

  const css =
    `${'@font-face {' +
      'font-family: "LUI icons";' +
      'src: url( "data:application/x-font-woff;charset=utf-8;base64,'}${content}") format( "woff" ),` +
      `     url( "data:application/x-font-ttf;charset=utf-8;base64,${content}") format( "truetype" );` +
    '}';

  const destPath = path.resolve(fixtureDistDir, 'lui-icons.css');
  fs.writeFileSync(destPath, css);
}

function createDirectories() {
  fileUtil.ensureDir(fixtureDistDir);
}

function copyResources() {
  fileUtil.copyFile(path.resolve(distDir, 'leonardo-ui.css'), path.resolve(fixtureDistDir, 'leonardo-ui.css'));
}

function buildAll() {
  createDirectories();
  copyResources();
  buildIconFontCSS();
  const fixtures = buildFixtures();
  buildFixturesOverview(fixtures);
}

module.exports = {
  buildIconFontCSS,
  buildFixtures,
  buildFixturesOverview,
  createDirectories,
  copyResources,
  buildAll
};
