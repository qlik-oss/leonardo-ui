const fixtureBuilder = require('../test/fixtures/build');

/**
 * Generate fixtures to be used in component (rendering) tests.
 * This function requires that "npm run build" has been run before calling it.
 */
console.log('Fixtures: creating directory structure');
fixtureBuilder.createDirectories();

console.log('Fixtures: copying files');
fixtureBuilder.copyResources();

console.log('Fixtures: building icon font as Base64');
fixtureBuilder.buildIconFontCSS();

console.log('Fixtures: building fixtures');
const fixtures = fixtureBuilder.buildFixtures();

console.log('Fixtures: building fixture overview');
fixtureBuilder.buildFixturesOverview(fixtures);
