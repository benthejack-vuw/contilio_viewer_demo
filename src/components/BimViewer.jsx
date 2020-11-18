import './bim-viewer.css';
import React, { useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import {
	addMeshesToScene,
	getAnimationFunction, getKeyboardHandler,
	initScene,
	onElementMouseMove,
	setVisibleObjects,
} from './viewer3dFuncs';
import { useDispatch, useSelector } from 'react-redux';


const classes = {
	viewer: {
		base: 'bim-viewer',
	}
}

const BimViewer = () => {
	const dispatch = useDispatch();
	const meshes = useSelector(({ viewer }) => viewer?.meshes);
	const viewerElement = useRef();

	const animateFunction = useMemo(() => getAnimationFunction(dispatch), [dispatch]);
	const onKeyPress = useMemo(() => (
			getKeyboardHandler(
				dispatch,
				Object.values(meshes)
			)
		),
		[dispatch, meshes]
	);

	useLayoutEffect(() => {
		viewerElement.current.addEventListener('mousemove', onElementMouseMove);
		document.addEventListener('keypress', onKeyPress);
		return () => {
			viewerElement.current.removeEventListener('mousemove', onElementMouseMove);
			document.removeEventListener('keypress', onKeyPress);
		}
	})

	useEffect(() => {
		setVisibleObjects(
			Object.values(meshes)
				.filter((meshData) => meshData.visible)
				.map((meshData) => meshData.mesh),
		)
	}, [meshes]);


	useLayoutEffect(() => {
		initScene(viewerElement.current);
		requestAnimationFrame(animateFunction);
		// stop animation on component unmount
		return () => cancelAnimationFrame(animateFunction);
	}, []);

	useEffect(() => {
		if (meshes) {
			addMeshesToScene(Object.values(meshes).map((meshContainer) => meshContainer.mesh));
		}
	}, [meshes])

  return (
    <div className={classes.viewer.base} ref={viewerElement}>

    </div>
  );
};

export default BimViewer;
