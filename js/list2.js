import React, { Component} from 'react';
import {
  ListView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Animated,
  LayoutAnimation
} from 'react-native';

let cards = require('./feed/mocks');
let AnimatedListView = Animated.createAnimatedComponent(ListView)
let AnimatedView = Animated.createAnimatedComponent(View)

class list2 extends React.Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(cards),
      top: new Animated.Value(0),
      size: {w: 335, h: 256 }
    };
  }

  _pressRow() {
    Animated.sprgin(this.state.top, {
      toValue: -30
    }).start();
  }

  _renderRow() {
    return (
      <AnimatedView style={styles.cellView}>
        <AnimatedView style={styles.backView}>
          <TouchableHighlight
            underlayColor='transparent'
            onPress={() => { this.setState({top: 30}) }}
          >
            <AnimatedView style={styles.frontView}>
              <Text>frontView</Text>
            </AnimatedView>
          </TouchableHighlight>
        </AnimatedView>
      </AnimatedView>
    )
  }

  render() {
    return (
      <AnimatedListView
        horizontal={true}
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
      />

    )
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
  },
  cellView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  backView: {
    backgroundColor: 'blue',
  },

  frontView: {
    width: 256,
    height: 335,
    backgroundColor: 'red',
  }
});

module.exports = list2
