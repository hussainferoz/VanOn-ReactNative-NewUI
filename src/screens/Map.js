import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const Map = () => {
	const [ mapMargin, setMapMargin ] = useState(1);

	return (
		<View style={styles.container}>
			<MapView
				provider={PROVIDER_GOOGLE}
				loadingEnabled
				style={{ ...StyleSheet.absoluteFill, margin: mapMargin }}
				onMapReady={() => {
					setMapMargin(0);
				}}
			/>
		</View>
	);
};

export default Map;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
