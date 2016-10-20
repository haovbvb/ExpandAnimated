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

class list3 extends React.Component {

	constructor() {
		super();
		let num = 30;
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','row 4', 'row 5','row 6']),
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
		// if (gestureState.dx > 0) { // 下拉
		// 	this._close();
		// } else { // 上拉
		// 	this._pressHandle();
		// }
  }

	_pressHandle(rowID: number) {
		console.log('_pressHandle==' + rowID);
		LayoutAnimation.linear();
		let num = 30;
		if (this.state.isOpen === false) {
			console.log('_pressHandle==false');
			this.setState ({
				isOpen: true,
				frontFrame: {t: this.state.frontFrame.t - num, w: this.state.frontFrame.w, h: this.state.frontFrame.h, mr: num/2},
				backFrame: {t: 0, w: this.state.backFrame.w + num, h: this.state.backFrame.h + num},
				isScrollEnabled: true
			})
		} else {
			console.log('_pressHandle==true');
			this.setState ({
				backFrame: {t: 120, w: Dimensions.get('window').width, h: Dimensions.get('window').height},
				frontFrame: {t: -120, w: Dimensions.get('window').width, h: 120, mr: 0},
				backMarginLeft: 0,
				isScrollEnabled: false,
			})
		}
	}

	_close() {
		LayoutAnimation.linear();
		let num = 0;
		if (this.state.frontFrame.t === -120) {
			num = 30;
		}

		this.setState ({
			isOpen: num > 0? true : false,
			frontFrame: {t: -num, w: 214, h: 264, mr: num * 0.5},
			backFrame: {t: 0, w: 214 + num, h: 264 + num},
			backMarginLeft: 20,
			isScrollEnabled: true
		})
	}

	_renderRow(rowData: string, sectionID: number, rowID: number) {
		return (
			<View style={[styles.container]}>
				<View style={[styles.back, {width: this.state.backFrame.w, height:this.state.backFrame.h, top: this.state.backFrame.t, marginLeft: this.state.backMarginLeft}]}>
					<TouchableHighlight onPress={ this._pressHandle.bind(this, rowID)} >
						<View style={[styles.front, {width: this.state.frontFrame.w, height:this.state.frontFrame.h, top: this.state.frontFrame.t, marginLeft: this.state.frontFrame.mr}]}
							// {...this._panResponder.panHandlers}
						>
							<Button onPress={ this._close.bind(this)} style={styles.closeButton}>
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
