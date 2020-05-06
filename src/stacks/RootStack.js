import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Authentication from './Authentication';

const RootStack = () => {
	return (
		<NavigationContainer>
			<Authentication />
		</NavigationContainer>
	);
};

export default RootStack;
