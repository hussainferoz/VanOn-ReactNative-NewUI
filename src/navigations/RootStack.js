import React, { useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator';
import Spinner from '../components/Spinner';

import { getToken } from '../AsyncStorage';

const RootStack = () => {
	const { isLoading, token, user } = useSelector((state) => state);

	const dispatch = useDispatch();

	const tokenNotFound = useCallback(() => dispatch({ type: 'TOKEN_NOT_FOUND' }), [ dispatch ]);
	const tokenUserFound = useCallback(
		() => dispatch({ type: 'TOKEN_USER_FOUND', payload: { token: 'SomeToken', user: {} } }),
		[ dispatch ]
	);

	useEffect(() => {
		getToken({ tokenNotFound, tokenUserFound });
	}, []);

	return (
		<NavigationContainer>
			{isLoading ? <Spinner /> : user && token ? <BottomTabNavigator /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default RootStack;
