import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, MarkerAnimated } from 'react-native-maps';

import * as Permissions from 'expo-permissions';

import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import CustomMarker from '../CustomMarker';

import { getSocketConnection } from '../Socket';
import { LATITUDE_DELTA, LONGITUDE_DELTA, DEFAULT_DELTAS } from '../../../Constants';

let latitudeDeltaValue = null;
let longitudeDeltaValue = null;
let socket = null;

const changeDeltas = (latitudeDelta = LATITUDE_DELTA, longitudeDelta = LONGITUDE_DELTA) => {
	latitudeDeltaValue = latitudeDelta;
	longitudeDeltaValue = longitudeDelta;
};

const Index = () => {
	const {
		user: { passengerPoint: { location: { coordinates: [ pointLongitude, pointLatitude ] } }, driverId }
	} = useSelector((state) => state.user);
	const [ mapMargin, setMapMargin ] = useState(1);
	const [ rideStatus, setRideStatus ] = useState(null);
	const [ MarkerAnimate ] = useState(
		new AnimatedRegion({
			latitude: 0,
			longitude: 0,
			...DEFAULT_DELTAS
		})
	);
	const mapViewRef = useRef(null);

	const point = {
		latitude: pointLatitude,
		longitude: pointLongitude
		// latitude: 37.4850453,
		// longitude: -122.1489067
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
						...DEFAULT_DELTAS
					},
					3000
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

		socket.on('trackVan-' + driverId, trackVanCallBack);
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
					...DEFAULT_DELTAS
				},
				3000
			);
		}
	};

	//callback function for the listner ride status.
	const rideStatusCallBack = (data) => {
		setRideStatus(data.rideStatus);
	};

	const trackVanCallBack = (data) => {
		const { coordinates: [ longitude, latitude ], rotation } = data;

		MarkerAnimate.timing({ latitude, longitude, duration: 5000 }).start();

		mapViewRef.current.animateToRegion(
			{
				latitude,
				longitude,
				latitudeDelta: latitudeDeltaValue,
				longitudeDelta: longitudeDeltaValue
			},
			3000
		);
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
				onRegionChangeComplete={({ latitudeDelta, longitudeDelta }) => {
					changeDeltas(latitudeDelta, longitudeDelta);
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
