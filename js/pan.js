import React ,{ Component } from 'react';
import {
	View,
	Text,
	ListView,
	StyleSheet,
	TouchableHighlight,
	Animated,
	LayoutAnimation,
	Modal,
	Dimensions,
	PanResponder,
	ScrollView,
	TouchableOpacity,
	Image
} from 'react-native';

class pan extends Component {
	constructor() {
		super();
		this.state = {
			pan: new Animated.ValueXY(),
		}

		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}]),
		})
	}

	theStyle() {
		return {
			width: 50,
			height: 50,
			backgroundColor: 'blue',
			transform: [
				{
            translateX: 0
        },
        {
          translateY: 8
        }
			]
		}
	}

	render() {
		return (
			<View style={ this.theStyle()}>
			</View>
		)
	}
}

module.exports = pan;
