import React from 'react';

import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const IconTextInput = (props) => {
	const getProps = () => {
		const { size, weight } = props;

		return {
			fontSize: size,
			fontFamily: weight
		};
	};

	return (
		<View style={styles.container}>
			<Icon name={props.iconName} size={20} style={styles.icon} />
			<TextInput
				placeholder={props.name}
				placeholderTextColor='#434343'
				secureTextEntry={props.textVisibility}
				keyboardType={props.keyboardType && props.keyboardType}
				style={{ ...getProps(), ...styles.textInput }}
			/>
		</View>
	);
};

export default IconTextInput;

IconTextInput.defaultProps = {
	size: 16,
	weight: 'Regular',
	textVisibility: false
};

const styles = StyleSheet.create({
	container: {
		width: width - 50,
		height: 50,
		backgroundColor: '#fff',
		elevation: 5,
		borderRadius: 25,
		alignItems: 'center',
		flexDirection: 'row',
		margin: 15
	},
	icon: {
		color: '#434343',
		marginLeft: 20,
		marginRight: 10
	},
	textInput: {
		flex: 1
	}
});
