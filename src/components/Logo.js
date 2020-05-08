import React from 'react';
import Animated from 'react-native-reanimated';

import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH, LOGIN_VIEW } from '../Constants';

const Logo = ({ scale }) => {
	return (
		<Animated.Image
			source={require('../../assets/VanOn_Logo.png')}
			resizeMode='contain'
			style={{
				...styles.logo,
				transform: [
					{
						scale
					}
				]
			}}
		/>
	);
};

export default Logo;

const styles = StyleSheet.create({
	logo: {
		width: SCREEN_WIDTH - 60,
		height: LOGIN_VIEW
		// aspectRatio: 3/2,
	}
});
