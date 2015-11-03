/**
 * @providesModule WithCustomFont
 */
'use strict';

import React from 'react-native';

class WithCustomFont extends React.Component {
  render() {
    let child = React.Children.only(this.props.children);
    return React.cloneElement(child, {
      style: [this.props.style, child.props.style],
    });
  }
}

function createCustomFontComponent(source) {
  return React.createClass({
    displayName: 'CustomFont: ' + source,

    render() {
      return (
        <WithCustomFont source={source}>
          {React.Children.only(this.props.children)}
        </WithCustomFont>
      );
    },
  });
}

module.exports = WithCustomFont;
module.exports.createCustomFontComponent = createCustomFontComponent;
