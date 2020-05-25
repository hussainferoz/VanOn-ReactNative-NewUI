const initialState = {
	isLoading: true,
	token: null,
	user: null
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'TOKEN_NOT_FOUND':
			return {
				...state,
				isLoading: false,
				token: null,
				user: null
			};
		case 'TOKEN_FOUND':
			console.log('token--------<<<<<<<TOKEN_FOUND>>>>>>>', action.payload.token);
			return {
				...state,
				token: action.payload.token
			};
		case 'SET_TOKEN':
			console.log('token--------<<<<<<<SET_TOKEN>>>>>>>', action.payload.token);
			return {
				...state,
				token: action.payload.token
			};
	}
	return state;
};

export default Reducer;
