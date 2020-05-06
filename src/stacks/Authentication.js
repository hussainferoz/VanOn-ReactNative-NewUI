import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';

const Stack = createStackNavigator();

const Authentication = () => {
	return (
		<Stack.Navigator initialRouteName='Sign In' headerMode='none'>
			<Stack.Screen name='Sign In' component={SignIn} />
		</Stack.Navigator>
	);
};

export default Authentication;
