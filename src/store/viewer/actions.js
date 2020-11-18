export const addMesh = (mesh) => ({
	type: 'ADD_MESH',
	mesh,
})

export const toggleMeshVisible = (Guid) => ({
	type: 'TOGGLE_MESH_VISIBLE',
	Guid,
})

export const setMeshVisibility = (Guid, visible) => ({
	type: 'SET_MESH_VISIBILITY',
	Guid,
	visible,
})

export const highlight = (Guid) => ({
	type: 'HIGHLIGHT_MESH',
	Guid,
})

export const unhighlight = () => ({
	type: 'UNHIGHLIGHT_MESH',
})
