import React, { useEffect } from 'react';
import Axios from 'axios';

import { StyleSheet, View, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { url } from '../Constants';

const Loading = () => {
	const { token, user } = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(
		() => {
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
		<View style={styles.container}>
			<Image source={require('../../assets/20442-map-v2.gif')} />
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({
	container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
