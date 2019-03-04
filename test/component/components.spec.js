/* global browser */
const components = require('../fixtures/dist/fixtures'); // eslint-disable-line import/no-unresolved

const port = process.env.PORT || 19001;

browser.ignoreSynchronization = true; // Must be set if the page doesn't use angular

const settings = {
  selector: '.component',
};

const test = typeof browser.params.test === 'string' ? browser.params.test : false;
Object.keys(components).forEach((component) => {
  const fixtures = components[component];
  fixtures.forEach((fixture) => {
    if (test && fixture.indexOf(test) === -1) {
      return;
    }

    describe(`Component: ${fixture}`, () => {
      const file = `http://127.0.0.1:${port}/test/fixtures/dist/${component}/${fixture}.html`;

      before(() => browser.get(file));

      it('should match baseline', () => {
        browser.wait(protractor.ExpectedConditions.presenceOf($('body.ready'), 5 * 1000, 'Page was not ready to render'));
        const img = browser.takeImageOf(settings);
        expect(img).to.eventually.matchImageOf(fixture, component);
      });
    });
  });
});
