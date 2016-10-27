
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

let App3 = require('./js/list3')
let App2 = require('./js/scrollView.js')
let App = require('./js/list')
let Pan = require('./js/pan')

export default class ExpandAnimated extends Component {
  render() {
    return (
      <Pan />
    );
  }
}

AppRegistry.registerComponent('ExpandAnimated', () => ExpandAnimated);
