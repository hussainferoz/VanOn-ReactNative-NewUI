import React from 'react';
import PropTypes from 'prop-types';

import ReactNative, { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { SCREEN_WIDTH } from '../Constants';

const getStyles = ({ fontWeight, bordertype, elevation, disabled, color }) => {
	const containerStyles = [ styles.containerDefault ];
	const inputStyles = [ styles.textInputDefault ];
	const iconStyles = [ styles.iconDefault ];

	if (fontWeight === 'Light') {
		inputStyles.push({ fontFamily: 'Light' });
	} else if (fontWeight === 'Regular') {
		inputStyles.push({ fontFamily: 'Regular' });
	} else if (fontWeight === 'SemiBold') {
		inputStyles.push({ fontFamily: 'SemiBold' });
	} else if (fontWeight === 'Bold') {
		inputStyles.push({ fontFamily: 'Bold' });
	} else if (fontWeight === 'ExtraBold') {
		inputStyles.push({ fontFamily: 'ExtraBold' });
	}

	if (color) {
		inputStyles.push({ color });
		iconStyles.push({ color });
	}

	if (bordertype === 'Rounded') {
		containerStyles.push({ borderRadius: 25 });
	} else if (bordertype === 'Squared') {
		containerStyles.push({ borderRadius: 5 });
	}

	if (disabled) {
		containerStyles.push({ backgroundColor: '#8c8c8c' });
		iconStyles.push({ color: '#fff' });
	}

	if (elevation) {
		containerStyles.push({ elevation: 5 });
	}
	return { containerStyles, inputStyles, iconStyles };
};

const TextInput = (props) => {
	const { name, iconName, iconSize, textVisibility, fontSize, color, disabled, keyboardType, ...rest } = props;

	const { containerStyles, inputStyles, iconStyles } = getStyles({ disabled, color, ...rest });

	return (
		<View style={containerStyles} pointerEvents={disabled ? 'none' : null}>
			{iconName ? <Icon name={iconName} size={iconSize} style={[ iconStyles ]} /> : null}

			<ReactNative.TextInput
				placeholder={name}
				placeholderTextColor={disabled ? '#fff' : color}
				secureTextEntry={textVisibility}
				keyboardType={keyboardType && keyboardType}
				style={[ inputStyles, { fontSize } ]}
			/>
		</View>
	);
};

export default TextInput;

TextInput.defaultProps = {
	fontSize: 16,
	iconSize: 20,
	fontWeight: 'Regular',
	color: '#434343',
	textVisibility: false,
	disabled: false
};

TextInput.prototype = {
	fontSize: PropTypes.number,
	iconSize: PropTypes.number,
	fontWeight: PropTypes.oneOf([ 'Light', 'Regular', 'Bold', 'SemiBold', 'Bold', 'ExtraBold' ]),
	textVisibility: PropTypes.bool,
	bordertype: PropTypes.oneOf([ 'Default', 'Rounded', 'Squared' ]),
	color: PropTypes.string,
	elevation: PropTypes.bool,
	disabled: PropTypes.bool
};

const styles = StyleSheet.create({
	containerDefault: {
		flexDirection: 'row',
		alignItems: 'center',
		width: SCREEN_WIDTH - 50,
		height: 50,
		backgroundColor: '#fff',
		marginVertical: 10
	},
	iconDefault: {
		marginHorizontal: 20
	},
	textInputDefault: {
		flex: 1
	}
});
