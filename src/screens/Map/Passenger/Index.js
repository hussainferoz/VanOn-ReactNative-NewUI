import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, MarkerAnimated } from 'react-native-maps';

import * as Permissions from 'expo-permissions';

import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import CustomMarker from '../CustomMarker';

import { getSocketConnection } from '../Socket';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../../../Constants';

const deltas = {
	latitudeDelta: LATITUDE_DELTA,
	longitudeDelta: LONGITUDE_DELTA
};

let socket = null;

const Index = () => {
	const { user: { passengerPoint: { location: { coordinates } }, driverId } } = useSelector((state) => state.user);
	const [ mapMargin, setMapMargin ] = useState(1);
	const [ rideStatus, setRideStatus ] = useState(null);
	const [ MarkerAnimate ] = useState(
		new AnimatedRegion({
			latitude: 0,
			longitude: 0,
			...deltas
		})
	);
	const mapViewRef = useRef(null);

	const point = {
		latitude: 37.4850453,
		longitude: -122.1489067
		// latitude: coordinates[1],
		// longitude: coordinates[0]
	};

	useEffect(() => {
		socket = getSocketConnection();
		requestPermission();

		return () => {
			console.log('Unmount');
			socket.disconnect();
		};
	}, []);

	useEffect(
		() => {
			if (rideStatus === false) {
				mapViewRef.current.animateToRegion(
					{
						...point,
						...deltas
					},
					2000
				);
			}
		},
		[ rideStatus ]
	);

	const requestPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status === Permissions.PermissionStatus.GRANTED) {
			socketListners();
		}
	};

	const socketListners = () => {
		socket.emit('getRide', { id: driverId });

		socket.once('getRide', getRideCallBack);

		socket.on('rideStatus-' + driverId, rideStatusCallBack);
	};

	//callback function for the listner get ride.
	const getRideCallBack = (data) => {
		const { status, coordinates: [ longitude, latitude ] } = data;
		setRideStatus(status);

		if (status) {
			MarkerAnimate.timing({ latitude, longitude }).start();

			mapViewRef.current.animateToRegion(
				{
					latitude,
					longitude,
					...deltas
				},
				2000
			);
		}
	};

	//callback function for the listner ride status.
	const rideStatusCallBack = (data) => {
		setRideStatus(data.rideStatus);
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
				{rideStatus && <MarkerAnimated coordinate={MarkerAnimate} />}
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
