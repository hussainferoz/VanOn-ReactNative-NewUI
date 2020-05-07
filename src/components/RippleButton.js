import React from 'react';
import Animated from 'react-native-reanimated';

import { StyleSheet, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import Text from './Text';

const { width } = Dimensions.get('window');

const RippleButton = (props) => {
	const getProps = () => {
		const { backgroundColor } = props;

		return {
			backgroundColor
		};
	};

	return (
		<RectButton style={{ ...getProps(), ...styles.container }} rippleColor={props.color}>
			<Text color={props.color}>{props.children}</Text>
			<Icon name={props.iconName} size={20} color={props.color} />
		</RectButton>
	);
};

export default RippleButton;

RippleButton.defaultProps = {
	backgroundColor: '#075E54',
	color: '#fff'
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		elevation: 5,
		width: width - 50,
		height: 50
	}
});
