const specFiles = [
  'src/**/__tests__/*.spec.js',
];

module.exports = {
  glob: specFiles,
  watchGlob: specFiles,
  coverage: true,
  mocks: [
    ['**/src/**/*.less', '{}'],
  ],
};
