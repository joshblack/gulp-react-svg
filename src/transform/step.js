'use strict';

const path = require('path');
const SVGO = require('svgo');
const addAttributesToSVGElement = require('../plugins/addAttributesToSVGElement');
const updateSVGTitle = require('../plugins/updateSVGTitle');

const svgo = new SVGO({
  plugins: [
    addAttributesToSVGElement,
    updateSVGTitle,
  ],
  js2svg: {
    pretty: true,
    indent: '  ',
  },
});

module.exports = function step(file, enc, cb) {
  if (file.isNull()) {
    cb(null, file);
    return;
  }

  if (!this._components) {
    this._components = {};
  }

  const source = file.contents.toString();

  svgo.optimize(source, (result) => {
    const title = path.basename(file.path, '.svg');
    const attributes = title.split('_');

    const namespace = path.dirname(file.path);
    // Remove the size qualifier
    const key = attributes.slice(0, attributes.length - 1).join('');

    if (!this._components[namespace]) {
      this._components[namespace] = {};
    }

    if (!this._components[namespace][key]) {
      this._components[namespace][key] = {
        dirname: path.dirname(file.path),
        definitions: [],
        file: file.clone(),
      };
    }

    this._components[namespace][key].definitions.push({
      title,
      content: result.data,
    });

    cb();
  });
};

