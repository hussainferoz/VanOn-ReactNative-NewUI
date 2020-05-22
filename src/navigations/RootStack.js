import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator';
import Spinner from '../components/Spinner';

const RootStack = () => {
	const { isLoading, token, user } = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			dispatch({ type: 'Test' });
		}, 5000);
	}, []);

	return (
		<NavigationContainer>
			{isLoading ? <Spinner /> : user && token ? <BottomTabNavigator /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default RootStack;
