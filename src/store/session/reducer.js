export const sessionInitialState = {
	accessToken: null,
}

const sessionReducer = (state, { type, ...action }) => {
	switch (type) {
		case 'LOGIN':
			return {
				...state,
				accessToken: action.accessToken,
			}
		case 'LOGOUT':
			return sessionInitialState;
		default:
			return {...state};
	}
}

export default sessionReducer;
