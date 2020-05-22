const initialState = {
	isLoading: true,
	token: null,
	user: null
};

const Reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'Test':
			return {
				...state,
				isLoading: false,
				token: 'dfsfsojfjs',
				user: {}
			};
	}
	return state;
};

export default Reducer;
