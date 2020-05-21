import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator';
import Spinner from '../components/Spinner';

const RootStack = () => {
	const { token, user } = useSelector((state) => state);

	return (
		<NavigationContainer>{token ? user ? <BottomTabNavigator /> : <AuthStack /> : <Spinner />}</NavigationContainer>
	);
};

export default RootStack;
