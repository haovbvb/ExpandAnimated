
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

let App = require('./js/list3')
let App2 = require('./js/scrollView.js')

export default class ExpandAnimated extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('ExpandAnimated', () => ExpandAnimated);
