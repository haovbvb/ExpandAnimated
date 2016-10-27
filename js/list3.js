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

let Itmes = require('./feed/mocks.js');

class Button extends React.Component {
  state = {
    active: false,
  };

  _onHighlight = () => {
    this.setState({active: true});
  };

  _onUnhighlight = () => {
    this.setState({active: false});
  };

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="transparent">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

var dataList = ['../images/pic1.png', '../images/pic2.png','../images/pic3.png','../images/pic4.png','../images/pic5.png'];
var myMap = new Map();
const NUM = 30;
const DEFAULT_WIDTH = 214;
const DEFAULT_HEIGHT= 264;
const EXPANDING_HEIGHT = 150;

class list3 extends React.Component {

	constructor() {
		super();
		let num = 30;
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(dataList),
			isScrollEnabled: true,
			stateDict: myMap,
			currentIndex: 0,
			theWidth: 100,
			totalHorizontalPages: 0,
      currentHorizontalPage: null,
			frontTop: 0
		}

		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
		})
	}

	_handleStartShouldSetPanResponder(e: Object, gestureState: Object){
    // Should we become active when the user presses down on the circle?
    return true;
  }

  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object){
    // Should we become active when the user moves a touch over the circle?
    return true;
  }

  _handlePanResponderMove(e: Object, gestureState: Object) {
		console.log("_handlePanResponderMove[" + gestureState.dx + "]" + "[" + gestureState.dy +"]" );
		console.log("page number ++" + this.state.currentHorizontalPage);
		if (gestureState.dx > 0) { // 下拉dx
			let stop = false;
			// if (gestureState.dy > 30) {
			// 	stop = true;
			// 	return;
			// }
			this._close(this.state.currentHorizontalPage);
		} else { // 上拉
			// this._pressHandle(0);
			if (gestureState.dy < -30) {
				return
			}
			this._pressHandle(this.state.currentHorizontalPage);
		}

  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
		console.log("_handlePanResponderEnd++" + e);
		// if (gestureState.dx > 0) { // 下拉
		// 	this._close(this.state.currentHorizontalPage - 1);
		// } else { // 上拉
		// 	this._pressHandle(this.state.currentHorizontalPage - 1);
		// }
  }

	_pressHandle(rowID: number) {
		console.log("_pressHandle=>" + this.state.stateDict.get(rowID));
		LayoutAnimation.linear();
		if ((this.state.stateDict.get(rowID) === 0) || !this.state.stateDict.get(rowID)) {
			console.log("_pressHandle++0");
			myMap.set(rowID, 1)
			this.setState ({
				isScrollEnabled: true,
				stateDict: myMap,
			})
		} else if (this.state.stateDict.get(rowID) === 1) {
			console.log("_pressHandle--1");
			myMap.set(rowID, 2)
			this.setState ({
				isScrollEnabled: true,
				stateDict: myMap,
			})
		} else {
			console.log("_pressHandle***3");
			myMap.set(rowID, 0)
			this.setState ({
				isScrollEnabled: true,
				stateDict: myMap,
			})
		}
	}

	_close(rowID) {
		console.log("_close==" + rowID + "state=" + this.state);
		LayoutAnimation.linear();
		if (this.state.stateDict.get(rowID) === 2) {
			myMap.set(rowID, 1)
			this.setState ({
				isScrollEnabled: true,
				stateDict: myMap
			})
		} else {
			myMap.set(rowID, 0)
			this.setState ({
				isScrollEnabled: true,
				stateDict: myMap
			})
		}
	}

	getBackViewStyle(rowID) {
		if (this.state.stateDict.get(rowID) === 1) {
			return [
				styles.back,
				{
					top: 0,
					width: DEFAULT_WIDTH + NUM ,
					height: DEFAULT_HEIGHT + NUM,
					marginLeft: 0,
				}
			]
		} else if (this.state.stateDict.get(rowID) === 2 ) {
			return [
				styles.back,
				{
					top: EXPANDING_HEIGHT,
					width: Dimensions.get('window').width,
					height: Dimensions.get('window').height,
					marginLeft: 0
				}
			]
		} else {
			return [
				styles.back,
				{
					top: 0,
					width: DEFAULT_WIDTH,
					height: DEFAULT_HEIGHT,
					marginLeft: 20
				}
			]
		}
	}

	getFrontViewStyle(rowID) {

		// for (var [key, value] of myMap) {
		//   console.log(key + " = " + value);
		// }
		if (this.state.stateDict.get(rowID) === 1) {
			// 1.展开
			return [
				styles.front,
				{
					top: -this.state.frontTop,//-NUM,
					width: DEFAULT_WIDTH,
					height: DEFAULT_HEIGHT,
					marginLeft: NUM/2
				}
			]
		} else if (this.state.stateDict.get(rowID) === 2) {
			// 2.全展开
			return [
				styles.front,
				{
					top: -EXPANDING_HEIGHT,
					width: Dimensions.get('window').width,
					height: EXPANDING_HEIGHT,
				}
			]
		} else {
			// 0.关闭
			return [
				styles.front,
				{
					top: 0,
					width: DEFAULT_WIDTH,
					height: DEFAULT_HEIGHT,
				}
			]
		}
	}

	getFrontBgViewStyle(rowID) {

		// for (var [key, value] of myMap) {
		//   console.log(key + " = " + value);
		// }
		if (this.state.stateDict.get(rowID) === 1) {
			// 1.展开
			return {
				width: DEFAULT_WIDTH,
				height: DEFAULT_HEIGHT,
			}
		} else if (this.state.stateDict.get(rowID) === 2) {
			// 2.全展开
			return {
				width: Dimensions.get('window').width,
				height: EXPANDING_HEIGHT,
			}
		} else {
			// 0.关闭
			return {
				width: DEFAULT_WIDTH,
				height: DEFAULT_HEIGHT,
			}
		}
	}

	getMainListViewStyle(rowID) {
		console.log("currentIndex=" + this.state.currentIndex);
		if (this.state.currentIndex === 0) {
			return [
				styles.container,
				{
					width: Dimensions.get('window').width - 100,
				}
			]
		} else if (this.state.currentIndex === rowID ) {
			return [
				styles.container,
				{
					width: Dimensions.get('window').width -200,
					marginLeft: 100
				}
			]
		} else if (this.state.currentIndex + 1 === rowID ) {
			return [
				styles.container,
				{
					width: Dimensions.get('window').width,
				}
			]
		} else if (this.state.currentIndex -1 === rowID ) {
			return [
				styles.container,
				{
					width: Dimensions.get('window').width,
				}
			]
		}
	}

	makeItems(items: Array) {
    // var items = ['../images/pic1.png', '../images/pic2.png','../images/pic3.png','../images/pic4.png','../images/pic5.png'];
		//onPress={ this._pressHandle.bind(this, i)}
    for (var i = 0; i < items.length; i++) {
       items[i] = (
				 <View style={styles.container} key={i}>
	 					<View style={this.getBackViewStyle(i)}>
	 						<TouchableHighlight  underlayColor={'transparent'}>
							<View style={this.getFrontViewStyle(i)}
								{...this._panResponder.panHandlers}
							>
									<Image source={require('../images/pic1.png')} style={this.getFrontBgViewStyle(i)} key={i}>
										<View>
											<Text>{i}</Text>
											<Button onPress={ this._close.bind(this, i)} style={styles.closeButton}>
												Close
											</Button>
										</View>
									</Image>
								</View>
	 						</TouchableHighlight>
	 					</View>
	 			</View>
       );
    }
    return items;
  }

	_handleScroll (event) {
    // Still trigger the passed callback, if provided:
    this.props.onScroll && this.props.onScroll(event);

    var e = event.nativeEvent;

    // Get values from event:
    this.scrollViewWidth = e.layoutMeasurement.width;
    this.scrollViewHeight = e.layoutMeasurement.height;
    this.innerScrollViewWidth = e.contentSize.width;
    this.innerScrollViewHeight = e.contentSize.height;

    // These are important, but they're not state variables that trigger an update:
    this.scrollX = e.contentOffset.x;
    this.scrollY = e.contentOffset.y;

    var totalHorizontalPages = Math.floor(this.innerScrollViewWidth / this.scrollViewWidth + 0.5);
    var totalVerticalPages = Math.floor(this.innerScrollViewHeight / this.scrollViewHeight + 0.5);

    this.setState({
      totalHorizontalPages: totalHorizontalPages,
      currentHorizontalPage: Math.min(Math.max(Math.floor(this.scrollX / this.scrollViewWidth + 0.5) + 1, 0), totalHorizontalPages),
    });
		console.log("_handleScroll ++" + this.state.currentHorizontalPage);
  }

	_handleContentSizeChange (width, height) {
    this.props.onContentSizeChange && this.props.onContentSizeChange(width, height);

    // Get values from event:
    this.innerScrollViewWidth = width;
    this.innerScrollViewHeight = height;

    var totalHorizontalPages = Math.max(1, Math.floor(this.innerScrollViewWidth / this.scrollViewWidth + 0.5));
    var totalVerticalPages = Math.max(1, Math.floor(this.innerScrollViewHeight / this.scrollViewHeight + 0.5));

    this.setState({
      totalHorizontalPages: totalHorizontalPages,
      currentHorizontalPage: Math.min(Math.max(Math.floor(this.scrollX / this.scrollViewWidth + 0.5) + 1, 0), totalHorizontalPages),
    });

  }

	render() {
		return (

				<ScrollView
	          horizontal={true}
						pagingEnabled={true}
	          style={styles.scrollView}
						onScroll={this._handleScroll.bind(this)}
						onContentSizeChange={this._handleContentSizeChange.bind(this)}
				>
						{this.makeItems(Itmes)}
	      </ScrollView>

		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		width: Dimensions.get('window').width,
	},

	front: {
		// backgroundColor: 'red',
		alignItems: 'flex-end'
	},
	back: {
		backgroundColor: 'blue',
	},
	closeButton: {
		top: 30,
		marginRight: 15,
		alignItems: 'flex-end',
	},
	scrollView: {

	}

});

module.exports = list3;
