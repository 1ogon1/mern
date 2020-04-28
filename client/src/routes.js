import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {AuthPage} from "./pages/AuthPage";
import {CreatePage} from "./pages/CreatePage";
import {DetailsPage} from "./pages/DetailsPage";
import {LinksPage} from "./pages/LinksPage";

export const useRoutes = (isAuthenticated) => {
	if (isAuthenticated) {
		return (
			<Switch>
				<Route path="/links" exact>
					<LinksPage/>
				</Route>
				<Route path="/create" exact>
					<CreatePage/>
				</Route>
				<Route path="/detail/:id">
					<DetailsPage/>
				</Route>
				<Redirect to="/create"/>
			</Switch>
		)
	}

	return (
		<Switch>
			<Route path="/" exact>
				<AuthPage/>
			</Route>
			<Redirect to="/"/>
		</Switch>
	)
}
