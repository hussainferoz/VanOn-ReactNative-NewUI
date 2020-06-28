import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';

export default ({ config }) => {
	return {
		...config,
		android: {
			package: 'com.VanOn.Van_On',
			versionCode: 1,
			config: {
				googleMaps: {
					apiKey: GOOGLE_MAPS_API_KEY
				}
			}
		}
	};
};
