import React, { useEffect, useCallback } from 'react';
import Axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator';
import Spinner from '../components/Spinner';

import { getToken } from '../AsyncStorage';
import { url } from '../Constants';

const RootStack = () => {
	const { isLoading, token, user } = useSelector((state) => state);

	const dispatch = useDispatch();

	const tokenNotFound = useCallback(() => dispatch({ type: 'TOKEN_NOT_FOUND' }), [ dispatch ]);
	const tokenFound = useCallback((token) => dispatch({ type: 'SET_TOKEN', payload: { token } }), [ dispatch ]);

	useEffect(
		() => {
			console.log('here');
			console.log('sojojfoi', Boolean(!user && !token));
			if (!user && !token) {
				getToken({ tokenNotFound, tokenFound });
			}
		},
		[ isLoading ]
	);

	useEffect(
		() => {
			console.log('tokenefect', Boolean(!user && token));
			if (!user && token) {
				fetchUser(token);
			}
		},
		[ token ]
	);

	const fetchUser = async (token) => {
		try {
			if (token) {
				await Axios.get(url + 'api/login', {
					headers: {
						'auth-token': token
					}
				}).then((promise) => {
					const value = promise.data;
					dispatch({ type: 'USER_FOUND', payload: { user: value.user } });
				});
			}
		} catch (error) {}
	};

	return (
		<NavigationContainer>
			{isLoading ? <Spinner /> : user && token ? <BottomTabNavigator /> : <AuthStack />}
		</NavigationContainer>
	);
};

export default RootStack;
