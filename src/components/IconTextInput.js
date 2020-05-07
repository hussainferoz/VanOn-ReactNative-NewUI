import React from 'react';

import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const IconTextInput = (props) => {
	const getProps = () => {
		const { size, weight, color } = props;

		return {
			fontSize: size,
			fontFamily: weight,
			color
		};
	};

	return (
		<View style={styles.container}>
			<MaterialIcons name={props.iconName} size={20} style={styles.icon} />
			<TextInput
				placeholder={props.name}
				placeholderTextColor='#434343'
				secureTextEntry={props.textVisibility}
				style={{ ...getProps(), ...styles.textInput }}
			/>
		</View>
	);
};

export default IconTextInput;

IconTextInput.defaultProps = {
	size: 15,
	weight: 'Regular',
	color: '#434343',
	textVisibility: false
};

const styles = StyleSheet.create({
	container: {
		width: width - 60,
		height: 50,
		backgroundColor: '#fff',
		elevation: 5,
		borderRadius: 25,
		alignItems: 'center',
		flexDirection: 'row'
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