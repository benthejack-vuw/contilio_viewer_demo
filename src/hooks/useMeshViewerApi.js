import { useSelector } from 'react-redux';
import { error } from 'three';

// a reeeeallll basic api abstraction layer
export const useMeshViewerApi = () => {
	const accessToken = useSelector(({ session }) => session.accessToken);

	const load = (url, method, body, contentType) => fetch(url, {
		method,
		headers: {
			'Content-Type': contentType || 'application/json',
			'Authorization': `Bearer ${accessToken}`,
		},
		body,
	}).catch(error => console.log(error));

	const loadJson = (url, method, body) =>(
		load(url, method, body).then((response) => {
				return response.json()
		}).catch(error => {
			console.log(error);
		})
	);

	const loadFile = (url, method, body) => (
		load(url, method, body, ).then(response => {
			return response.arrayBuffer();
		})
	)
	// returns a promise with the parsed json
	return {
		loadJson,
		loadFile,
	}
};
