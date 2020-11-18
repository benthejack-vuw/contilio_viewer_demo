import React from 'react';
import {
	Switch,
	Route,
	BrowserRouter,
} from 'react-router-dom';

import Login from './Login';
import Viewer from './Viewer';
import PrivateRoute from '../components/PrivateRoute';
import globalPaths from '../settings/globalPaths';

const classes = {
	mainContent: 'main-content',
}

export default () => (
	<BrowserRouter>
			<div className={classes.mainContent}>
				<Switch>
					<Route path={globalPaths.root} exact>
						<Login />
					</Route>

					<PrivateRoute path={globalPaths.viewer}>
						<Viewer />
					</PrivateRoute>
				</Switch>
			</div>
	</BrowserRouter>
)
