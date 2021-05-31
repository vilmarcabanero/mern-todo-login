import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { CredentialsContext } from '../App';

const RegisterPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [credentials, setCredentials] = useContext(CredentialsContext);

	const register = async e => {
		e.preventDefault();

		const config = {
			header: {
				'Content-Type': 'application/json',
			},
		};

		try {
			await axios
				.post(
					'http://localhost:4000/api/auth/register',
					{ email, password },
					config
				)
				.then(() => {
					setCredentials({
						email,
						password,
					});
					history.push('/');
				})
				.then(setIsLoading(true));

			console.log('User successfully created.');
		} catch (err) {
			console.log(err.response.data.error);
			setError(err.response.data.error);
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
			<h1> Register</h1>
			{error}
			<form onSubmit={register}>
				<input
					onChange={e => setEmail(e.target.value)}
					placeholder='username'
				/>
				<br />
				<input
					type='password'
					onChange={e => setPassword(e.target.value)}
					placeholder='password'
				/>
				<br />
				<button type='submit'>Register</button>
			</form>
		</div>
	);
};

export default RegisterPage;
