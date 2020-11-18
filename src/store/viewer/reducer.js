import { act } from '@testing-library/react';

export const viewerInitialState = {
	highlighted: '',
	meshes: {},
};

const viewerReducer = (prev, { type, ...action }) => {
	switch (type) {
		case 'ADD_MESH':
			return {
				...prev,
				meshes: {
					...prev.meshes,
					[action.mesh.Guid]: action.mesh,
				},
			}
		case 'HIGHLIGHT_MESH':
			return {
				...prev,
				highlighted: action.Guid,
			}
		case 'UNHIGHLIGHT_MESH':
			return {
				...prev,
				highlighted: '',
			}
		case 'TOGGLE_MESH_VISIBLE':
			return {
				...prev,
				meshes: {
					...prev.meshes,
					[action.Guid]: {
						...prev.meshes[action.Guid],
						visible: !prev.meshes[action.Guid].visible,
					}
				}
			}
		case 'SET_MESH_VISIBILITY':
			return {
				...prev,
				meshes: {
					...prev.meshes,
					[action.Guid]: {
						...prev.meshes[action.Guid],
						visible: action.visible,
					}
				}
			}
		default:
			return { ...prev }
	}
}

export default viewerReducer;
