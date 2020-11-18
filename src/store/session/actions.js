export const login = (accessToken) => ({
	type: 'LOGIN',
	accessToken,
})

export const logout = (accessToken) => ({
	type: 'LOGOUT',
})
