import React, { useState, useEffect, useRef } from 'react';

import { StyleSheet, View, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Permissions from 'expo-permissions';

import { getUserLocation } from '../Location';

const Index = () => {
	const [ mapMargin, setMapMargin ] = useState(1);
	const mapViewRef = useRef(null);

	useEffect(() => {
		requestPermission();
	});

	const requestPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status === Permissions.PermissionStatus.GRANTED) {
			const region = await getUserLocation();
			mapViewRef.current.animateToRegion(region, 2000);
		}
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle='dark-content' translucent backgroundColor='transparent' />
			<MapView
				provider={PROVIDER_GOOGLE}
				ref={mapViewRef}
				loadingEnabled
				showsUserLocation
				zoomControlEnabled
				style={{ ...StyleSheet.absoluteFill, margin: mapMargin }}
				onMapReady={() => {
					setMapMargin(0);
				}}
			/>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
