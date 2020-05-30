import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import * as Permissions from 'expo-permissions';

import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import CustomMarker from '../CustomMarker';

import { DELTA, OFFSET } from '../../../Constants';

const Index = () => {
	const { user: { passengerPoint: { location: { coordinates } } } } = useSelector((state) => state.user);
	const [ mapMargin, setMapMargin ] = useState(1);
	const mapViewRef = useRef(null);

	const point = {
		latitude: coordinates[1],
		longitude: coordinates[0]
	};

	useEffect(() => {
		requestPermission();
	}, []);

	const requestPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status === Permissions.PermissionStatus.GRANTED) {
			mapViewRef.current.animateToRegion(
				{
					...point,
					latitudeDelta: DELTA * OFFSET,
					longitudeDelta: DELTA * OFFSET
				},
				2000
			);
		}
	};

	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				ref={mapViewRef}
				zoomControlEnabled
				style={{ ...StyleSheet.absoluteFill, margin: mapMargin }}
				onMapReady={() => {
					setMapMargin(0);
				}}
			>
				<CustomMarker point={point} />
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
