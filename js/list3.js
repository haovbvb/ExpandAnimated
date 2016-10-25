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
} from 'react-native';

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
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

var dataList = ['row 1', 'row 2','row 3','row 4','row 5'];
var myMap = new Map();
const NUM = 30;
const defaultWidth = 214;
const defaultHeight = 264;

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
			theWidth: 100
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
		console.log("_handlePanResponderMove[" + gestureState.dy + "]" );
		if (gestureState.dx > 0) { // 下拉
			this._close();
		} else { // 上拉
			this._pressHandle();
		}
  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
		if (gestureState.dx > 0) { // 下拉
			this._close();
		} else { // 上拉
			this._pressHandle();
		}
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
					width: defaultWidth + NUM ,
					height: defaultHeight + NUM,
					marginLeft: 0,
				}
			]
		} else if (this.state.stateDict.get(rowID) === 2 ) {
			return [
				styles.back,
				{
					top: 120,
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
					width: defaultWidth,
					height: defaultHeight,
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
					top: -NUM,
					width: defaultWidth,
					height: defaultHeight,
					marginLeft: NUM/2
				}
			]
		} else if (this.state.stateDict.get(rowID) === 2) {
			// 2.全展开
			return [
				styles.front,
				{
					top: -120,
					width: Dimensions.get('window').width,
					height: 120,
				}
			]
		} else {
			// 0.关闭
			return [
				styles.front,
				{
					top: 0,
					width: defaultWidth,
					height: defaultHeight,
				}
			]
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

	_renderRow(rowData: string, sectionID: number, rowID: number) {
		return (
			<View style={styles.container} >
					<View style={this.getBackViewStyle(rowID)}>
						<TouchableHighlight onPress={ this._pressHandle.bind(this, rowID)} >
							<View style={this.getFrontViewStyle(rowID)}
								// {...this._panResponder.panHandlers}
							>
							<Text>{rowID}</Text>
								<Button onPress={ this._close.bind(this, rowID)} style={styles.closeButton}>
									Close
								</Button>
							</View>
						</TouchableHighlight>
					</View>
				</View>
		)
	}

	handleScroll() {
		return (
			<View style={[styles.container, {marginLeft: 0 * Dimensions.get('window').width}]} >
					<View style={this.getBackViewStyle(0)}>
						<TouchableHighlight onPress={ this._pressHandle.bind(this, 0)} >
							<View style={this.getFrontViewStyle(0)}
								// {...this._panResponder.panHandlers}
							>
							<Text>324</Text>
								<Button onPress={ this._close.bind(this, 0)} style={styles.closeButton}>
									Close
								</Button>
							</View>
						</TouchableHighlight>
					</View>
			</View>
		)
	}
	render() {
		return (
			// <ListView
			// 	horizontal={true}
			// 	pagingEnabled={true}
			// 	scrollEnabled={this.state.isScrollEnabled}
			// 	dataSource={this.state.dataSource}
			// 	renderRow={this._renderRow.bind(this)}
			// />

			<ScrollView
          horizontal={true}
          style={[styles.scrollView, styles.horizontalScrollView]}>
				<View style={{width: 2000}}>
					{this.handleScroll()}
				</View>
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
		backgroundColor: 'red',
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
		width: 20000//dataList.length * Dimensions.get('window').width
	}

});

module.exports = list3;
