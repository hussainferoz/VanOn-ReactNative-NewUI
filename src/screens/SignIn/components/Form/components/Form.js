import React, { useState, useCallback, useEffect } from 'react';
import Animated from 'react-native-reanimated';

import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Text from '../../../../../components/Text';
import TextInput from '../../../../../components/TextInput';
import Button from '../../../../../components/Button';

import { setToken } from '../../../../../AsyncStorage';

const Form = ({ textColor }) => {
	const [ viewPassowrd, setViewPassword ] = useState(true);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);

	const { token } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(
		() => {
			setLoading(false);
		},
		[ token ]
	);

	const setTokenData = useCallback((token) => dispatch({ type: 'SET_TOKEN', payload: { token } }), [ dispatch ]);

	const changeEmailHandler = (value) => {
		setEmail(value);
	};

	const changePasswordHandler = (value) => {
		setPassword(value);
	};

	const signInHandler = () => {
		setLoading(true);

		setToken({ email, password, setTokenData });
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

			<Button
				iconName='login'
				bordertype='Rounded'
				animation='Ripple'
				elevation
				onPress={signInHandler}
				loading={loading}
			>
				Sign In
			</Button>
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
