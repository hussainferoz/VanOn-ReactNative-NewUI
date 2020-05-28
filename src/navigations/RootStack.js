import React, { useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator';
import Loading from '../screens/Loading';

import { getToken } from '../AsyncStorage';

const RootStack = () => {
	const { isLoading, token, user } = useSelector((state) => state);

	const dispatch = useDispatch();

	const tokenNotFound = useCallback(() => dispatch({ type: 'TOKEN_NOT_FOUND' }), [ dispatch ]);
	const tokenFound = useCallback((token) => dispatch({ type: 'SET_TOKEN', payload: { token } }), [ dispatch ]);

	useEffect(
		() => {
			if (!user && !token) {
				getToken({ tokenNotFound, tokenFound });
			}
		},
		[ isLoading ]
	);

	return (
		<NavigationContainer>
			{isLoading ? <Loading /> : user && token ? <BottomTabNavigator /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default RootStack;
