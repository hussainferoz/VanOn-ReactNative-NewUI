import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Map from '../screens/Map';
import Setting from '../screens/Setting';

const Tabs = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
	return (
		<Tabs.Navigator initialRouteName='Map' shifting>
			<Tabs.Screen
				name='Map'
				component={Map}
				options={{
					tabBarColor: '#3f48cc',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name='map-outline' color={color} size={26} />
				}}
			/>
			<Tabs.Screen
				name='Setting'
				component={Setting}
				options={{
					tabBarColor: '#00a8f3',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name='settings-outline' color={color} size={26} />
					)
				}}
			/>
		</Tabs.Navigator>
	);
};

export default BottomTabNavigator;
