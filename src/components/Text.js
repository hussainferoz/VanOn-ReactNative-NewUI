import React from 'react';
import ReactNative from 'react-native';

const Text = (props) => {
	const getProps = () => {
		const { size, weight, color } = props;

		return {
			fontSize: size,
			fontFamily: weight,
			color
		};
	};

	return <ReactNative.Text style={{ ...getProps() }}>{props.children}</ReactNative.Text>;
};

export default Text;

Text.defaultProps = {
	size: 18,
	weight: 'Regular',
	color: 'black'
};
