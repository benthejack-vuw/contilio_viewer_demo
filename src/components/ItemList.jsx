import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemListItem from './ItemListItem';
import { toggleMeshVisible } from '../store/viewer/actions';

const ItemList = () => {
	const meshMap = useSelector(({viewer}) => viewer.meshes);
	const meshes = useMemo(() => Object.values(meshMap), [meshMap]);
	const dispatch = useDispatch();

	const highlight = (Guid) => {
		Object.values(meshMap)
			.filter((meshData) => meshData.Guid !== Guid)
			.forEach((meshData) => {
				meshData.mesh.material.opacity = 0.1;
				meshData.mesh.needsUpdate = true;
			});
	}

	const unHighlight = () => {
		Object.values(meshMap)
			.forEach((meshData) => {
				meshData.mesh.material.opacity = 1;
				meshData.mesh.needsUpdate = true;
			});
	}

	const toggleVisibility = (Guid) => {
		meshMap[Guid].mesh.material.visible = !meshMap[Guid].visible;
		meshMap[Guid].mesh.needsUpdate = true;
		dispatch(toggleMeshVisible(Guid));
	}

  return (
    <div style={{width: '100%'}}>
			{meshes.map((meshData) => (
				<ItemListItem
					data={meshData}
					toggleVisibility={toggleVisibility}
					highlight={highlight}
					unhighlight={unHighlight}
				/>
			))}
    </div>
  );
};

export default ItemList;
