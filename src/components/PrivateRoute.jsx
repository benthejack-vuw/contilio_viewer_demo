import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import globalPaths from '../settings/globalPaths';

const PrivateRoute = (props) => {
	const history = useHistory();

	const authenticated = useSelector(
		({ session }) => !!session?.accessToken,
	);

	useEffect(() => {
		if (!authenticated) {
			history.push(globalPaths.root);
		}
	}, [authenticated]);

	return <Route {...props} />;
};

export default PrivateRoute;
