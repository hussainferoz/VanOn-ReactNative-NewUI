import React from 'react';

import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

import Text from '../components/Text';
import IconTextInput from '../components/IconTextInput';
import Button from '../components/RippleButton';

const SignIn = () => {
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Image source={require('../../assets/VanOn_Logo.png')} resizeMode='contain' style={styles.logoImage} />
			</View>
			<View style={styles.bottomContainer}>
				<View style={styles.bottomTopContainer}>
					<Text size={30} weight='Bold'>
						Welcome,
					</Text>
					<Text size={20} weight='SemiBold'>
						Sign in to continue!
					</Text>
				</View>

				<View style={styles.bottomEndContainer}>
					<IconTextInput iconName='email' name='Email' />

					<IconTextInput iconName='key' name='Password' textVisibility={true} />

					<View style={styles.forgotPassword}>
						<Text weight='SemiBold'>Forgot Password?</Text>
					</View>

					<Button iconName='login'>Sign In </Button>
				</View>
			</View>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#075E54'
	},
	topContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logoImage: {
		width: width,
		height: 115 * (width / 440)
	},
	bottomContainer: {
		flex: 8,
		width: width,
		paddingTop: 30,
		backgroundColor: '#f8f8f8',
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35
	},
	bottomTopContainer: {
		paddingLeft: 30,
		marginBottom: 30
	},
	bottomEndContainer: {
		flex: 1,
		alignItems: 'center'
	},
	forgotPassword: {
		alignItems: 'flex-end',
		width: width - 60,
		marginBottom: 30
	}
});
