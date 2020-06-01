import React, { useState, useEffect, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import * as Permissions from 'expo-permissions';

import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import CustomMarker from '../CustomMarker';
import Button from '../../../components/Button';

import { getUserLocation } from '../Location';
import { getPassengerPoints, getSocketConnection } from './components/Fetch';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../../../Constants';

let latitudeDeltaValue = null;
let longitudeDeltaValue = null;
let socket = null;

const changeDeltas = (latitudeDelta = LATITUDE_DELTA, longitudeDelta = LONGITUDE_DELTA) => {
	latitudeDeltaValue = latitudeDelta;
	longitudeDeltaValue = longitudeDelta;
};

const Index = () => {
	const { token, user: { user } } = useSelector((state) => state);
	const [ mapMargin, setMapMargin ] = useState(1);
	const [ allMarkers, setAllMarkers ] = useState(null);
	const [ rideStatus, setRideStatus ] = useState(null);
	const [ watchId, setWatchId ] = useState(null);
	const mapViewRef = useRef(null);

	const { watchPosition, clearWatch } = navigator.geolocation;

	useEffect(() => {
		requestPermission();
		socket = getSocketConnection();
		getPassengerPoints(token).then((points) => {
			setAllMarkers(points);
		});

		return () => {
			console.log('Unmount');
			socket.emit('rideStatus', { id: user._id, rideStatus: false });
			clearWatch(watchId);
			socket.disconnect();
		};
	}, []);

	useEffect(
		() => {
			if (rideStatus) {
				shareLocation();
			} else if (rideStatus === false) {
				stopShareLocation();
			}
		},
		[ rideStatus ]
	);

	const shareLocation = () => {
		socket.emit('rideStatus', { id: user._id, rideStatus: rideStatus });
		changeDeltas();
		watchLocation();
	};

	const stopShareLocation = () => {
		socket.emit('rideStatus', { id: user._id, rideStatus: rideStatus });
		clearWatch(watchId);
	};

	const requestPermission = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status === Permissions.PermissionStatus.GRANTED) {
			const region = await getUserLocation();
			mapViewRef.current.animateToRegion(region, 2000);
		}
	};

	const watchLocation = () => {
		const id = watchPosition(
			(position) => {
				const { coords: { longitude, latitude, heading } } = position;

				mapViewRef.current.animateToRegion(
					{
						latitude,
						longitude,
						latitudeDelta: latitudeDeltaValue,
						longitudeDelta: longitudeDeltaValue
					},
					500
				);

				const { _id, vendorId, name: { firstName, lastName }, van: { vanNumber } } = user;
				console.log({
					id: _id,
					driverName: `${firstName} ${lastName}`,
					vanNumber: vanNumber,
					vendorId: vendorId,
					heading: heading,
					coordinate: [ longitude, latitude ]
				});

				socket.emit('trackVan', {
					id: _id,
					driverName: `${firstName} ${lastName}`,
					vanNumber: vanNumber,
					vendorId: vendorId,
					heading: heading,
					coordinate: [ longitude, latitude ]
				});
			},
			null,
			{ enableHighAccuracy: true, distanceFilter: 0 }
		);

		setWatchId(id);
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
				onRegionChangeComplete={({ latitudeDelta, longitudeDelta }) => {
					changeDeltas(latitudeDelta, longitudeDelta);
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
