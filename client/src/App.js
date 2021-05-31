import './App.css';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';

export const CredentialsContext = React.createContext(null);

const App = () => {
	const credentialState = useState(null);
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
				</Switch>
			</CredentialsContext.Provider>
		</div>
	);
};

export default App;
