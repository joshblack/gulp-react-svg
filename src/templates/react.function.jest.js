'use strict';

module.exports = (Component) => `import React from 'react';
import renderer from 'react-test-renderer';
import ${Component}Icon from '../${Component}Icon';

describe('${Component}Icon', () => {
  it('should render correctly', () => {
    const tree = renderer.create(
      <${Component}Icon />
    );
    expect(tree).toMatchSnapshot();
  });
});
`;

