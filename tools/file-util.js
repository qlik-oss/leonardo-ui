const fs = require('fs');

module.exports.writeFile = function writeFile(to, content) {
  if (fs.existsSync(to)) {
    const toContent = fs.readFileSync(to).toString();
    if (toContent === content.toString()) {
      // file content never changed, do nothing:
      return;
    }
  }
  fs.writeFileSync(to, content);
};

module.exports.copyFile = function copyFile(from, to) {
  const fromContent = fs.readFileSync(from);
  module.exports.writeFile(to, fromContent);
};

module.exports.ensureDir = function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
