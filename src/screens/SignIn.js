import React from 'react';

import { StyleSheet, View, Text } from 'react-native';

const SignIn = () => {
	return (
		<View style={styles.container}>
			<Text style={{ ...styles.textStyle }}>System Fonts</Text>
			<Text style={{ ...styles.textStyle, fontFamily: 'Light' }}>OpenSans-Light</Text>
			<Text style={{ ...styles.textStyle, fontFamily: 'Regular' }}>OpenSans-Regular</Text>
			<Text style={{ ...styles.textStyle, fontFamily: 'SemiBold' }}>OpenSans-SemiBold</Text>
			<Text style={{ ...styles.textStyle, fontFamily: 'Bold' }}>OpenSans-Bold</Text>
			<Text style={{ ...styles.textStyle, fontFamily: 'ExtraBold' }}>OpenSans-ExtraBold</Text>
		</View>
	);
};

export default SignIn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	textStyle: {
		fontSize: 25
	}
});
