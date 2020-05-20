import React from 'react';
import PropTypes from 'prop-types';

import ReactNative from 'react-native';

const getStyles = ({ fontWeight }) => {
	const textStyles = [];

	if (fontWeight === 'Light') {
		textStyles.push({ fontFamily: 'Light' });
	} else if (fontWeight === 'Regular') {
		textStyles.push({ fontFamily: 'Regular' });
	} else if (fontWeight === 'SemiBold') {
		textStyles.push({ fontFamily: 'SemiBold' });
	} else if (fontWeight === 'Bold') {
		textStyles.push({ fontFamily: 'Bold' });
	} else if (fontWeight === 'ExtraBold') {
		textStyles.push({ fontFamily: 'ExtraBold' });
	}

	return { textStyles };
};

const Text = (props) => {
	const { fontSize, children, color, style, ...rest } = props;
	const { textStyles } = getStyles({ ...rest });

	return <ReactNative.Text style={[ textStyles, { ...style, fontSize, color } ]}>{children}</ReactNative.Text>;
};

export default Text;

Text.defaultProps = {
	fontSize: 16,
	fontWeight: 'Regular',
	color: '#fff'
};

Text.prototype = {
	fontSize: PropTypes.number,
	fontWeight: PropTypes.oneOf([ 'Light', 'Regular', 'Bold', 'SemiBold', 'Bold', 'ExtraBold' ]),
	color: PropTypes.string
};
