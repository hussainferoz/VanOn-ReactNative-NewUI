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
		case 'TOKEN_USER_FOUND':
			return {
				...state,
				isLoading: false,
				token: action.payload.token,
				user: action.payload.user
			};
	}
	return state;
};

export default Reducer;
