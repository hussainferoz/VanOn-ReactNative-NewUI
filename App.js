import 'react-native-gesture-handler';

import React from 'react';

import { YellowBox } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from './src/navigations/RootStack';
import Reducer from './src/store/Reducer';

YellowBox.ignoreWarnings([ 'Unrecognized WebSocket' ]);

const store = createStore(Reducer);

const customFonts = {
	Light: require('./assets/fonts/Open_Sans/OpenSans-Light.ttf'),
	Regular: require('./assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
	SemiBold: require('./assets/fonts/Open_Sans/OpenSans-SemiBold.ttf'),
	Bold: require('./assets/fonts/Open_Sans/OpenSans-Bold.ttf'),
	ExtraBold: require('./assets/fonts/Open_Sans/OpenSans-ExtraBold.ttf')
};

const App = () => {
	const [ fontsLoaded ] = useFonts(customFonts);

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<Provider store={store}>
			<NavigationContainer>
				<RootStack />
			</NavigationContainer>
		</Provider>
	);
};

export default App;
