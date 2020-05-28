import React, { useCallback } from 'react';

import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Button from '../components/Button';

import { removeToken } from '../AsyncStorage';

const Setting = () => {
	const dispatch = useDispatch();

	const removeUserToken = useCallback(() => dispatch({ type: 'REMOVE_USER_TOKEN' }));

	const logoutHandler = () => {
		removeToken(removeUserToken);
	};

	return (
		<View style={styles.container}>
			<Button onPress={logoutHandler}>Logout</Button>
		</View>
	);
};

export default Setting;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 25,
		fontFamily: 'Bold'
	}
});
