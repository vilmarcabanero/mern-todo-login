import './App.css';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';

export const CredentialsContext = React.createContext(null);

const App = () => {
	const credentialState = useState({
		email: 'vilmarcabanero@gmail.com', //Todo temp remove this
		password: 'fuckclan123',
		username: 'Iona',
	});
	return (
		<div className='App'>
			<CredentialsContext.Provider value={credentialState}>
				<Switch>
					<Route exact path='/'>
						<WelcomePage />
					</Route>
					<Route exact path='/register'>
						<RegisterPage />
					</Route>
					<Route exact path='/login'>
						<LoginPage />
					</Route>
				</Switch>
			</CredentialsContext.Provider>
		</div>
	);
};

export default App;
