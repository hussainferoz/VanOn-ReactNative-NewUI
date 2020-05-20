import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator';

const RootStack = () => {
	return (
		<NavigationContainer>
			{/* <AuthStack /> */}
			<BottomTabNavigator />
		</NavigationContainer>
	);
};

export default RootStack;
