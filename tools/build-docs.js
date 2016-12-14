const docsBuilder = require('../docs/build');

/**
 * Build the docs. Requires that "npm run build" has been run prior to this.
 */
console.log('Docs: building docs');
console.log('Docs: creating directory structure');
docsBuilder.createDirectories();

console.log('Docs: compiling LESS');
docsBuilder.compileLess();

console.log('Docs: compiling templates');
docsBuilder.compileTemplates();

console.log('Docs: copying resources');
docsBuilder.copyResources();

console.log('Docs: build complete');
