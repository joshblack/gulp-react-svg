'use strict';

function updateSVGTitle(item) {
  if (item.elem && item.isElem('title')) {
    item.content = [{
      text: '{props.title}',
    }];
  }

  return item;
}

module.exports = {
  updateSVGTitle: {
    type: 'perItem',
    description: 'Update the title of the SVG Element',
    fn: updateSVGTitle,
  },
};
