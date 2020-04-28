import 'materialize-css'
import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Loader} from "./components/Loader";
import {NavBar} from "./components/NavBar";
import {AuthContext} from "./context/auth.context";
import {useAuth} from "./hooks/auth.hook";
import {useRoutes} from "./routes";

function App() {
	const {login, logout, token, userId, ready} = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)

	if (!ready) {
		return <Loader/>
	}

	return (
		<AuthContext.Provider value={{token, logout, login, userId, isAuthenticated}}>
			<BrowserRouter>
				{isAuthenticated && <NavBar/>}
				<div className="container">
					{routes}
				</div>
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
