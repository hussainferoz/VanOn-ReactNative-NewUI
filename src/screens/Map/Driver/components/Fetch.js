import Axios from 'axios';
import SocketIo from 'socket.io-client';

import { url } from '../../../../Constants';

export const getPassengerPoints = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			await Axios.get(url + 'api/driver/passenger-coordinates', {
				headers: {
					'auth-token': token
				}
			}).then((response) => {
				const { data: { passCoords } } = response;
				resolve(
					passCoords.map((element) => {
						const { passengerPoint: { location: { coordinates } } } = element;
						return {
							latitude: coordinates[1],
							longitude: coordinates[0]
						};
					})
				);
			});
		} catch (error) {}
	});
};

export const socketConnection = SocketIo.connect(url, {
	timeout: 10000,
	jsonp: false,
	transports: [ 'websocket' ],
	autoConnect: false,
	agent: '-',
	path: '/', // Whatever your path is
	pfx: '-',
	key: '-', // Using token-based auth.
	passphrase: '-', // Using cookie auth.
	cert: '-',
	ca: '-',
	ciphers: '-',
	rejectUnauthorized: '-',
	perMessageDeflate: '-'
});
