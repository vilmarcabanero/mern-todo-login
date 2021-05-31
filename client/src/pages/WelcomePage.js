import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CredentialsContext } from '../App';

const WelcomePage = () => {
	const [credentials] = useContext(CredentialsContext);
	return (
		<div className='App'>
			<h1> Welcome {credentials && credentials.email}</h1>
			{!credentials && <Link to='/register'>Register</Link>}
		</div>
	);
};

export default WelcomePage;
