import React ,{ Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Animated,
	LayoutAnimation,
	Modal,
	Dimensions
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
		this.state = {
			isOpen: false,
			frame: {t: 0, w: 256, h: 335},
			animationType: 'fade',
	    modalVisible: false,
	    transparent: false,
			topContent: 300,
			detailFrame: {w: 256, h: 335}
		}
	}

	_pressHandle() {
		LayoutAnimation.spring();
		let topValue, ww;
		if (this.state.isOpen == false) {
			topValue = -30
			ww = this.state.frame.w + 30
		} else {
			ww = this.state.frame.w - 30;
			this._setModalVisible(true)
		}
		this.setState ({
			isOpen: !this.state.isOpen,
			frame: {t: topValue, w: ww, h: this.state.frame.h},
		})
	}

	_setModalVisible(visible) {
		LayoutAnimation.spring();
		this.setState ({
			modalVisible: visible,
			topContent: 0,
			topViewHeight: 120
		})
  };

  _setAnimationType(type) {
    this.setState({animationType: type});
  };

  _toggleTransparent(){
    this.setState({transparent: !this.state.transparent});
  };

	render() {
		return (
			<View style={styles.container}>
				<View style={[styles.back, {width: this.state.frame.w, height:this.state.frame.h, top: this.state.frame.topContent}]}>
					<TouchableHighlight onPress={this._pressHandle.bind(this)} >
						<View style={[styles.front, {width: 256, height:335, top: this.state.frame.t}]}>
							<Text>
								front
							</Text>
						</View>
					</TouchableHighlight>
				</View>
				<Modal
		          animationType={this.state.animationType}
		          transparent={this.state.transparent}
		          visible={this.state.modalVisible}
		          onRequestClose={() => this._setModalVisible(false)}
		     >
		          <View style={[styles.theContent, {top: this.state.topContent}]}>
								<View style={[styles.front2, {width: this.state.detailFrame.w, height:this.state.detailFrame.h, top: this.state.topContent}]}>
									<Text>
										front
									</Text>
								</View>
		            <View style={styles.innerContainer}>
		              <Button
		                onPress={this._setModalVisible.bind(this, false)}
		                style={styles.modalButton}>
		                Close
		              </Button>
		            </View>
		          </View>
		    </Modal>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	front: {
		backgroundColor: 'red',

	},
	front2: {
		backgroundColor: 'green',

	},
	back: {
		backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center'
	},
	theContent: {
		backgroundColor: 'orange'
	},
	innerContainer: {

	},
	modalButton: {
		top: 10
	}
});

module.exports = list3;
