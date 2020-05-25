import React, { useState } from 'react';
import Animated from 'react-native-reanimated';

import { StyleSheet } from 'react-native';

import Text from '../../../../../components/Text';
import TextInput from '../../../../../components/TextInput';
import Button from '../../../../../components/RippleButton';

const Form = ({ textColor }) => {
	const [ viewPassowrd, setViewPassword ] = useState(true);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	changeEmailHandler = (value) => {
		setEmail(value);
	};

	changePasswordHandler = (value) => {
		setPassword(value);
	};

	return (
		<Animated.View style={styles.actionContainer}>
			<TextInput
				iconLeftName='email'
				name='Email'
				keyboardType='email-address'
				bordertype='Rounded'
				elevation
				color={textColor}
				style={styles.textInput}
				value={email}
				OnChangeText={changeEmailHandler}
			/>

			<TextInput
				iconLeftName='key'
				iconRightName={viewPassowrd ? 'eye' : 'eye-off'}
				iconRightPress={() => {
					setViewPassword(!viewPassowrd);
				}}
				name='Password'
				bordertype='Rounded'
				textVisibility={viewPassowrd}
				elevation
				color={textColor}
				style={styles.textInput}
				value={password}
				OnChangeText={changePasswordHandler}
			/>

			<Text fontWeight='SemiBold' color={textColor} style={styles.forgotPassword}>
				Forgot Password?
			</Text>

			<Button iconName='login'>Sign In </Button>
		</Animated.View>
	);
};

export default Form;

const styles = StyleSheet.create({
	actionContainer: {
		alignItems: 'center'
	},
	forgotPassword: {
		alignSelf: 'flex-end',
		marginBottom: 30,
		marginRight: 30
	},
	textInput: {
		marginVertical: 15
	}
});
