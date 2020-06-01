import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import * as Permissions from 'expo-permissions';

import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import CustomMarker from '../CustomMarker';
import Button from '../../../components/Button';

import { getUserLocation } from '../Location';
import { getPassengerPoints, socketConnection } from './components/Fetch';

const Index = () => {
	const { token, user: { user } } = useSelector((state) => state);
	const [ mapMargin, setMapMargin ] = useState(1);
	const [ allMarkers, setAllMarkers ] = useState(null);
	const [ rideStatus, setRideStatus ] = useState(false);
	const mapViewRef = useRef(null);

	let socket = null;

	useEffect(() => {
		requestPermission();
		getPassengerPoints(token).then((points) => {
			setAllMarkers(points);
			socket = socketConnection;
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(
		() => {
			if (rideStatus) {
				shareLocation();
			} else {
				stopShareLocation();
			}
		},
		[ rideStatus ]
	);

	const shareLocation = async () => {
		if (socket) {
			await socket.emit('rideStatus', { id: user._id, rideStatus: rideStatus });
		}
	};

	const stopShareLocation = async () => {
		if (socket) {
			await socket.emit('rideStatus', { id: user._id, rideStatus: rideStatus });
		}
	};

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
			<Button
				bordertype='Rounded'
				animation='Ripple'
				elevation
				style={styles.but}
				onPress={() => {
					setRideStatus(!rideStatus);
				}}
			>
				{rideStatus ? 'End Ride' : 'Start Ride'}
			</Button>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	but: {
		position: 'absolute',
		bottom: 10,
		width: 150
	}
});
