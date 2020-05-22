import { AsyncStorage } from 'react-native';

import { tokenName } from './Constants';

export const getToken = async ({ tokenNotFound, tokenUserFound }) => {
	try {
		const token = await AsyncStorage.getItem(tokenName);
		console.log(token, tokenName);
		if (!token) {
			tokenNotFound();
		} else {
			tokenUserFound();
		}
	} catch (error) {}
};
