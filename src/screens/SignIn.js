import React from 'react';

import { StyleSheet, View, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

import Text from '../components/Text';
import IconTextInput from '../components/IconTextInput';

const SignIn = () => {
	return (
		<View style={styles.container}>
			<View style={styles.topContainer}>
				<Image source={require('../../assets/VanOn_Logo.png')} resizeMode='contain' style={styles.logoImage} />
			</View>
			<View style={styles.bottomContainer}>
				<IconTextInput iconName='email' name='Email' />
				{/* <IconTextInput iconName='vpn-key' name='Password' textVisibility={true} /> */}
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
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f8f8f8',
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40
	}
});
