'use strict';

const indent = require('indent-string');

const midpoint = (array) => {
  const mid = Math.floor(array.length / 2);

  return array[mid];
};

const sizesToString = (sizes) => {
  return sizes.map((size) => `'${size}'`).join(', ');
};

const printPaths = (paths) => {
  let output = '{';

  Object.keys(paths).forEach((path) => {
    output += '\n';
    output += indent(`'${path}': (`, 4);
    output += '\n';
    output += indent(paths[path], 6);
    output += indent('),', 4);
  });

  output += '\n';
  output += indent('}', 2);

  return output;
};

module.exports = (Component, svgPaths) => {
  const sizes = Object.keys(svgPaths);

  return `import React from 'react';

/* eslint-disable */
const ${Component}Icon = (props) => {
  const sizes = ${printPaths(svgPaths)};

  return sizes[props.size];
};

${Component}Icon.propTypes = {
  title: React.PropTypes.string,
  className: React.PropTypes.string,
  size: React.PropTypes.oneOf([${sizesToString(sizes)}]),
};

${Component}Icon.defaultProps = {
  title: '${Component}',
  size: '${midpoint(sizes)}',
};

export default ${Component}Icon;
`;
};
