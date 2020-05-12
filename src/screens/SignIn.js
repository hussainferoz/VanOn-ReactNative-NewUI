import React, { useRef, useState } from 'react';
import Animated, { Value, useCode, cond, eq, set, interpolate } from 'react-native-reanimated';

import { StyleSheet, View, StatusBar } from 'react-native';
import { useTimingTransition } from 'react-native-redash';

import Logo from '../components/Logo';
import Text from '../components/Text';
import TextInput from '../components/TextInput';
import Button from '../components/RippleButton';

import { SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW } from '../Constants';

const SignIn = () => {
	const scale = useRef(new Value(0));
	const [ viewPassowrd, setViewPassword ] = useState(true);

	const scaleAnimation = useTimingTransition(scale.current, { duration: 500 });

	useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);

	const translateY = interpolate(scaleAnimation, {
		inputRange: [ 0, 1 ],
		outputRange: [ SCREEN_HEIGHT, LOGIN_VIEW ]
	});

	const opacity = interpolate(scaleAnimation, {
		inputRange: [ 0, 1 ],
		outputRange: [ 0, 1 ]
	});

	return (
		<View style={styles.container}>
			<StatusBar backgroundColor='#075E54' barStyle='light-content' />

			<Animated.View style={styles.logoContainer}>
				<Logo scale={scaleAnimation} />
			</Animated.View>

			<Animated.View
				style={{
					...StyleSheet.absoluteFill,
					...styles.bottomContainer,
					transform: [
						{
							translateY: translateY
						}
					],
					opacity
				}}
			>
				<Animated.View style={styles.textContainer}>
					<Text size={30} weight='Bold'>
						Welcome,
					</Text>
					<Text size={20} weight='SemiBold'>
						Sign in to continue!
					</Text>
				</Animated.View>

				<Animated.View style={styles.actionContainer}>
					<TextInput
						iconLeftName='email'
						name='Email'
						keyboardType='email-address'
						bordertype='Rounded'
						elevation
						style={styles.textInput}
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
						style={styles.textInput}
					/>

					<Animated.View style={styles.forgotPassword}>
						<Text weight='SemiBold'>Forgot Password?</Text>
					</Animated.View>

					<Button iconName='login'>Sign In </Button>
				</Animated.View>
			</Animated.View>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#075E54'
	},
	logoContainer: {
		flex: 1,
		alignItems: 'center'
	},
	bottomContainer: {
		borderTopLeftRadius: 30,
		borderTopRightRadius: 30,
		backgroundColor: '#f8f8f8'
	},
	textContainer: {
		paddingLeft: 20,
		paddingVertical: 15
	},
	actionContainer: {
		alignItems: 'center'
	},
	forgotPassword: {
		alignItems: 'flex-end',
		width: SCREEN_WIDTH - 60,
		marginBottom: 30
	},
	textInput: {
		marginVertical: 15
	}
});
