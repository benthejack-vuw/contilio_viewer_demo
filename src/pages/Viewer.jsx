import './viewer.css';
import React, { useEffect } from 'react';
import { useMeshViewerApi } from '../hooks/useMeshViewerApi';
import { useDispatch } from 'react-redux';
import { addMesh } from '../store/viewer/actions';
import ItemList from '../components/ItemList';
import BimViewer from '../components/BimViewer';
import { loadMeshSTL, parseStl } from '../components/viewer3dFuncs';


const classes = {
	viewer: {
		base: 'viewer-page',
		itemList: 'viewer-page__item-list',
		meshViewer: 'viewer-page__mesh-viewer',
	}
}

const Viewer = () => {
	const { loadJson, loadFile } = useMeshViewerApi();
	const dispatch = useDispatch();

	useEffect(() => {
		loadJson('/data/manifest', 'GET').then(
			(meshItems) => {
					meshItems.forEach((meshItm) => {
						loadFile(`data/model/${meshItm.Guid}`, 'GET').then(
							(data) => {
								const dispatchMesh = (mesh) => {
									dispatch(addMesh({
										...meshItm,
										visible: true,
										mesh,
									}));
								};
								parseStl(data, meshItm.Guid, meshItm.State, dispatchMesh);
							}
						);
					})
			}
		);
	}, []);

	return (
	<div className={classes.viewer.base}>
		<div className={classes.viewer.itemList}>
			<ItemList />
		</div>
		<div className={classes.viewer.meshViewer}>
			<BimViewer />
		</div>
	</div>
	)
};

export default Viewer;
