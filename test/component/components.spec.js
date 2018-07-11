/* global browser */
const components = require('../fixtures/dist/fixtures'); // eslint-disable-line import/no-unresolved

browser.ignoreSynchronization = true; // Must be set if the page doesn't use angular

const settings = {
  selector: '.component'
};

const test = typeof browser.params.test === 'string' ? browser.params.test : false;

Object.keys(components).forEach((component) => {
  const fixtures = components[component];
  fixtures.forEach((fixture) => {
    if (test && fixture.indexOf(test) === -1) {
      return;
    }

    describe(`Component: ${fixture}`, () => {
      const file = `dist/${component}/${fixture}.html`;

      before(() => browser.get(file));

      it('should match baseline', () => {
        const img = browser.takeImageOf(settings);
        expect(img).to.eventually.matchImageOf(fixture, component);
      });
    });
  });
});
