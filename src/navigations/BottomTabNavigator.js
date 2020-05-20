import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Map from '../screens/Map';
import Setting from '../screens/Setting';
import Text from '../components/Text';

const Tabs = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
	return (
		<Tabs.Navigator initialRouteName='Map' shifting>
			<Tabs.Screen
				name='Map'
				component={Map}
				options={{
					tabBarColor: '#3f48cc',
					tabBarLabel: (
						<Text fontSize={14} fontWeight='SemiBold'>
							Map
						</Text>
					),
					tabBarIcon: ({ focused, color }) => (
						<MaterialCommunityIcons name='google-maps' color={color} size={26} />
					)
				}}
			/>
			<Tabs.Screen
				name='Setting'
				component={Setting}
				options={{
					tabBarColor: '#00a8f3',
					tabBarLabel: (
						<Text fontSize={14} fontWeight='SemiBold'>
							Setting
						</Text>
					),
					tabBarIcon: ({ focused, color }) => (
						<MaterialCommunityIcons name='settings' color={color} size={26} />
					)
				}}
			/>
		</Tabs.Navigator>
	);
};

export default BottomTabNavigator;
