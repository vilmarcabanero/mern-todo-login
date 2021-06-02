import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CredentialsContext } from '../App';
import Todos from '../components/Todos'


const WelcomePage = () => {
	const [credentials] = useContext(CredentialsContext);
	return (
		<div className='App'>
			<h1> Welcome {credentials && credentials.username}</h1>
			{!credentials && <Link to='/register'>Register</Link>} <br />
			{!credentials && <Link to='/login'>Login</Link>}
			{credentials && <Todos />}
		</div>
	);
};

export default WelcomePage;
