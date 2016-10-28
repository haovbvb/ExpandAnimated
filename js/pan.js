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
			pan: new Animated.ValueXY(0),
			top: 0
		}

		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: Animated.event([null, {dx: this.state.pan.x, dy: this.state.pan.y}]),
			onPanResponderRelease: this._handlePanResponderRelease.bind(this)
		})
	}

	_handlePanResponderRelease(e: Object, gestureState: Object) {
		this.setState({
			top: this.state.top += gestureState.dy
		})
	}

	theStyle() {
		return {
			width: 50,
			height: 50,
			backgroundColor: 'blue',
			top: this.state.top,
			transform: [
				{
          translateY: this.state.pan.y
        },
        {
          translateY: this.state.pan.y
        }
			]
		}
	}

	render() {
		return (
			<Animated.View style={ this.theStyle()}
				{...this._panResponder.panHandlers}
			>
			</Animated.View>
		)
	}
}

module.exports = pan;
