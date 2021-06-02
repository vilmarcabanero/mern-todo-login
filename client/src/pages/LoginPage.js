import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { CredentialsContext } from '../App';


const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [credentials, setCredentials] = useContext(CredentialsContext);

	const login = async e => {
		e.preventDefault();

		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			await axios
				.post(
					'http://localhost:4000/api/auth/login',
					{ email, password },
					config
				)
				.then(({ data }) => {
					console.log(data.message);
					setCredentials({
						email,
						password,
						username: data.username,
					});
					history.push('/');
				})
				.then(setIsLoading(true));
		} catch (err) {
			console.log(err.response.data.message);
			setError(err.response.data.message);
			setTimeout(() => {
				setError('');
			}, 3000);
			setIsLoading(false);
		}
	};

	const history = useHistory();

	if (isLoading) {
		return (
			<div>
				<h3>Please wait...</h3>
			</div>
		);
	}

	return (
		<div className='App'>
			<h1> Login</h1>
			{error}
			<form onSubmit={login}>
				<input onChange={e => setEmail(e.target.value)} placeholder='email' />
				<br />
				<input
					type='password'
					onChange={e => setPassword(e.target.value)}
					placeholder='password'
				/>
				<br />
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default LoginPage;
