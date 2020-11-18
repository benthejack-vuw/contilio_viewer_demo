import './login.css';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../store/session/actions';
import { useMeshViewerApi } from '../hooks/useMeshViewerApi';


const classes = {
	login: {
		base: 'login-page',
		loginBox: 'login-page__login-box',
	}
}


const Login = () => {
	const { loadJson } = useMeshViewerApi();
	const history = useHistory();
	const [loginForm, setLoginForm] = useState({});
	const [error, setError] = useState('');
	const dispatch = useDispatch();

	const handleChange = (param, value) => {
		setLoginForm((prev) => ({
			...prev,
			[param]: value,
		}))
	}

	const handleSubmit = () => {
		loadJson('/login', 'POST', JSON.stringify(loginForm))
			.then(data => {
			if (data.error) {
				setError(data.error);
			} else if (data.accessToken) {
				dispatch(login(data.accessToken))
				history.push('/viewer');
			}
		});
	}

	return (
	<div className={classes.login.base}>
		<div className={classes.login.loginBox}>
			<label htmlFor="userName">
				User Name:
				<input
					type="text"
					onChange={(e) => handleChange('userName', e.target.value)}
					value={login.userName}
				/>
			</label>
			<label htmlFor="password">
				Password:
				<input
					type="password"
					onChange={(e) => handleChange('password', e.target.value)}
					value={login.password}
				/>
			</label>
			{ error && <div className={classes.login.error}>{error}</div> }
			<button onClick={handleSubmit}> submit </button>
		</div>
	</div>
)};


export default Login;
