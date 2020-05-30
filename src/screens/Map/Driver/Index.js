import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import * as Permissions from 'expo-permissions';

import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import CustomMarker from '../CustomMarker';

import { getUserLocation } from '../Location';
import { getPassengerPoints } from './Fetch';

const Index = () => {
	const { token } = useSelector((state) => state);
	const [ mapMargin, setMapMargin ] = useState(1);
	const [ allMarkers, setAllMarkers ] = useState(null);
	const mapViewRef = useRef(null);

	useEffect(() => {
		requestPermission();
		getPassengerPoints(token).then((points) => {
			setAllMarkers(points);
		});
	}, []);

	const requestPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status === Permissions.PermissionStatus.GRANTED) {
			const region = await getUserLocation();
			mapViewRef.current.animateToRegion(region, 2000);
		}
	};

	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				ref={mapViewRef}
				showsUserLocation
				zoomControlEnabled
				style={{ ...StyleSheet.absoluteFill, margin: mapMargin }}
				onMapReady={() => {
					setMapMargin(0);
				}}
			>
				{allMarkers && allMarkers.map((point, index) => <CustomMarker key={index} point={point} />)}
			</MapView>
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
