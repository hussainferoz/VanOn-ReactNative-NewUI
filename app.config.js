import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';

export default ({ config }) => {
	return {
		...config,
		android: {
			config: {
				googleMaps: {
					apiKey: GOOGLE_MAPS_API_KEY
				}
			}
		}
	};
};
