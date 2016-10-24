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
	PanResponder
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

var myMap = new Map();
const NUM = 30;

class list3 extends React.Component {

	constructor() {
		super();
		let num = 30;
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','row 4', 'row 5','row 6']),
			expandingFlag: 0,
			isOpen: false,
			backFrame: {t: 0, w: 214, h: 264},
			frontFrame: {t: 0, w: 214, h: 264, mr: 0},
			backMarginLeft: 20,
			isScrollEnabled: true,
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
		console.log('_pressHanfasfasfasdle==' + rowID);

		LayoutAnimation.linear();
		let num = 30;
		if (this.state.isOpen === false) {
			myMap.set(rowID, 1)
			console.log('_pressHandle==false++'+ myMap.get(rowID));
			this.setState ({
				expandingFlag: 1,
				isScrollEnabled: true
			})
		} else {
			myMap.set(rowID, 2)
			console.log('_pressHandle==true++'+ myMap.get(rowID));
			this.setState ({
				expandingFlag: 2,
				isScrollEnabled: true,
			})
		}
	}

	_close(rowID) {
		LayoutAnimation.linear();
		myMap.set(rowID, 0)
		let num = 0;
		if (this.state.frontFrame.t === -120) {
			num = 30;
		}

		this.setState ({
			expandingFlag: 0,
			isOpen: num > 0? true : false,
			isScrollEnabled: true
		})
	}

	getBackViewStyle(rowID) {
		let expandingFlag = myMap.get(rowID);
		if (this.state.expandingFlag === expandingFlag) {
			return [
				styles.back,
				{
					top: 0,
					width: 214 + NUM,
					height: 264 + NUM,
					marginLeft: 0,
				}
			]
		} else if (this.state.expandingFlag === expandingFlag) {
			return [
				styles.back,
				{
					top: 120,
					width: Dimensions.get('window').width,
					height: Dimensions.get('window').height - 120,
					marginLeft: 20
				}
			]
		} else {
			return [
				styles.back,
				{
					top: 0,
					width: 214,
					height: 264,
					marginLeft: 20
				}
			]
		}
	}

	getFrontViewStyle(rowID) {

		let expandingFlag = myMap.get(rowID);
		console.log("getFrontViewStyle+++" + rowID);
		if (this.state.expandingFlag === expandingFlag) {
			return [
				styles.front,
				{
					top: -NUM,
					width: 214,
					height: 264,
				}
			]
		} else if (this.state.expandingFlag === expandingFlag) {
			return [
				styles.front,
				{
					top: -120,
					width: Dimensions.get('window').width,
					height: 120,
				}
			]
		} else {
			return [
				styles.front,
				{
					top: 0,
					width: 214,
					height: 264,
				}
			]
		}
	}

	_renderRow(rowData: string, sectionID: number, rowID: number) {
		console.log("_renderRow=" + rowID);
		return (
			<View style={[styles.container, { width: Dimensions.get('window').width}]}>
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

	render() {
		return (
			<ListView
				horizontal={true}
				pagingEnabled={true}
				scrollEnabled={this.state.isScrollEnabled}
				dataSource={this.state.dataSource}
				renderRow={this._renderRow.bind(this)}
			/>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'gray'
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
	}

});

module.exports = list3;
