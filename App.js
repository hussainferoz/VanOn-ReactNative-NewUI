import React from 'react';
import ReactNative, { StyleSheet, View } from 'react-native';

import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';

const customFonts = {
	Light: require('./assets/fonts/Open_Sans/OpenSans-Light.ttf'),
	Regular: require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
	Bold: require('./assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
	SemiBold: require('./assets/fonts/Open_Sans/OpenSans-SemiBold.ttf'),
	ExtraBold: require('./assets/fonts/Open_Sans/OpenSans-ExtraBold.ttf')
};

const App = () => {
	const [ fontsLoaded ] = useFonts(customFonts);

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<View style={styles.container}>
			<ReactNative.Text style={{ ...styles.textStyle }}>System Fonts</ReactNative.Text>
			<ReactNative.Text style={{ ...styles.textStyle, fontFamily: 'Light' }}>OpenSans-Light</ReactNative.Text>
			<ReactNative.Text style={{ ...styles.textStyle, fontFamily: 'Regular' }}>OpenSans-Regular</ReactNative.Text>
			<ReactNative.Text style={{ ...styles.textStyle, fontFamily: 'SemiBold' }}>
				OpenSans-SemiBold
			</ReactNative.Text>
			<ReactNative.Text style={{ ...styles.textStyle, fontFamily: 'Bold' }}>OpenSans-Bold</ReactNative.Text>
			<ReactNative.Text style={{ ...styles.textStyle, fontFamily: 'ExtraBold' }}>
				OpenSans-ExtraBold
			</ReactNative.Text>
		</View>
	);
};

export default App;

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
