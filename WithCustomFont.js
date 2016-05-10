/**
 * @providesModule WithCustomFont
 */
'use strict';

import React, { PropTypes } from 'react';
import {
  Platform,
  View,
} from 'react-native';

import warning from 'fbjs/lib/warning';

import loadFontAsync from './utils/loadFontAsync';

export default class WithCustomFont extends React.Component {
  static propTypes = {
    uri: PropTypes.string.isRequired,
    fontFamilyAndroid: PropTypes.string,
    fontStyleAndroid: PropTypes.oneOf(['regular', 'bold', 'italic', 'bold-italic'])
  };

  state = {
    ready: false
  };

  componentDidMount() {
    const { uri, fontFamilyAndroid, fontStyleAndroid } = this.props;

    const fontLoaderOptions = {
      uri,
      fontFamily: fontFamilyAndroid,
      fontStyle: fontStyleAndroid
    };

    loadFontAsync(fontLoaderOptions)
      .then((fontName) => {
        this.setState({ready: true, fontName});
      })
      .catch((err) => {
        this.setState({err});
      });
  }

  render() {
    if (this.state.err && this.props.renderError) {
      return this.props.renderError(this.state.err);
    } else if (this.state.ready) {
      const child = React.Children.only(this.props.children);
      return React.cloneElement(child, {
        style: [this.props.style, child.props.style],
      });
    } else {
      if (this.props.renderNotReady) {
        return this.props.renderNotReady(this.props.children);
      } else {
        return <View style={this.props.style} />;
      }
    }
  }

}

export function createCustomFontComponent(options) {
  if (!options.uri) {
    throw new Error(
      'WithCustomFont: You must specify a uri to the font ' +
      'file in the options object passed to this function.'
    );
  }

  if (!options.fontFamilyAndroid || !options.fontStyleAndroid) {
    if (Platform.OS === 'android') {
      throw new Error(
        'WithCustomFont: On Android, you must specify the ' +
        'fontFamily and fontStyle for the font being loaded.'
      );
    } else if (Platform.OS === 'ios') {
      warning(
        false,
        'WithCustomFont: In order to use `WithCustomFont` on Android, you must specify ' +
        '\'fontFamilyAndroid\' and \'fontStyleAndroid\' in the \'options\' object that you pass to ' +
        'this function. Android cannot infer font metadata and thus it must be specified manually.'
      );
    }
  }

  return React.createClass({
    displayName: `CustomFont: ${options.uri}`,

    render() {
      return (
        <WithCustomFont {...options}>
          {React.Children.only(this.props.children)}
        </WithCustomFont>
      );
    },
  });
}
