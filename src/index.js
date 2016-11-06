'use strict';

const through = require('through2');
const step = require('./transform/step');
const flush = require('./transform/flush');

function transform(options) {
  return through.obj(step, flush);
}

module.exports = transform;
