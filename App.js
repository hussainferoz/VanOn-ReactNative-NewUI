import 'react-native-gesture-handler';

import React from 'react';

import { useFonts } from '@use-expo/font';

import RootStack from './src/stacks/RootStack';
import Spinner from './src/components/Spinner';

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
		return <Spinner />;
	}

	return <RootStack />;
};

export default App;
