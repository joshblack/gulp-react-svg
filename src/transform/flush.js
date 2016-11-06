'use strict';

const path = require('path');
const template = require('../templates/react.function');
const test = require('../templates/react.function.jest');

module.exports = function flush(callback) {
  Object.keys(this._components).forEach((namespace) => {
    Object.keys(this._components[namespace]).forEach((key) => {
      const { dirname, definitions, file } = this._components[namespace][key];
      const sizes = definitions.reduce((acc, definition) => {
        const { title, content } = definition;
        const attributes = title.split('_');
        const size = attributes[attributes.length - 1];

        return Object.assign({}, acc, {
          [size]: content,
        });
      }, {});

      const testFile = file.clone();

      file.path = path.resolve(dirname, `${key}Icon.js`);
      file.contents = new Buffer(template(key, sizes));

      testFile.path = path.resolve(dirname, `__tests__/${key}Icon-test.js`);
      testFile.contents = new Buffer(test(key));

      this.push(file);
      this.push(testFile);
    });
  });

  return callback();
};
