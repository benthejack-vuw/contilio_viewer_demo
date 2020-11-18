import {
	AmbientLight,
	Color,
	DirectionalLight, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshStandardMaterial,
	PerspectiveCamera,
	Raycaster,
	Scene,
	Vector2,
	Vector3,
	WebGLRenderer,
} from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { highlight, setMeshVisibility, toggleMeshVisible, unhighlight } from '../store/viewer/actions';

const statusColours = {
	ok: 0x505050,
	missing: 0xff0000,
	'out-of-tolerance': 0xb2b236,
}

const loader = new STLLoader();

let camera, controls, cameraTarget, scene, renderer;
let raycaster = new Raycaster();
let mouse = new Vector2(), INTERSECTED;
let visibleObjects = [], invisibleObjects = [];

export function initScene(parentElement) {
	// Camera
	camera = new PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 15 );
	camera.position.set( -3, 7, 2 );

	cameraTarget = new Vector3( 0, - 0.1, 0 );
	camera.lookAt( cameraTarget );


	// Background
	scene = new Scene();
	scene.background = new Color( 0xf0f0f0 );

	// Lights
	scene.add( new AmbientLight( 0x808080 ) );
	addShadowedLight( 1, 1, 1, 0xffffff, 1.35 );

	// renderer

	renderer = new WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(parentElement.clientWidth, parentElement.clientHeight);

	renderer.gammaInput = true;
	renderer.gammaOutput = true;

	renderer.shadowMap.enabled = true;

	parentElement.appendChild( renderer.domElement );

	controls = new TrackballControls( camera, renderer.domElement );

	controls.rotateSpeed = 2.0;
	controls.zoomSpeed = 0.3;
	controls.panSpeed = 0.2;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	controls.minDistance = 0.3;
	controls.maxDistance = 0.3 * 100;
}

export function addMeshesToScene(meshes) {
	meshes.forEach((mesh) => scene.add(mesh));
}

function addShadowedLight( x, y, z, color, intensity ) {
	const directionalLight = new DirectionalLight( color, intensity );
	directionalLight.position.set( x, y, z );
	scene.add( directionalLight );

	directionalLight.castShadow = true;

	const d = 1;
	directionalLight.shadow.camera.left = - d;
	directionalLight.shadow.camera.right = d;
	directionalLight.shadow.camera.top = d;
	directionalLight.shadow.camera.bottom = - d;

	directionalLight.shadow.camera.near = 1;
	directionalLight.shadow.camera.far = 4;

	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;

	directionalLight.shadow.bias = - 0.001;
}

export function parseStl(stlBuffer, guid, status, addedCallback) {
	const geom = loader.parse(stlBuffer);
	geom.name = guid;
	const mesh = loadMeshSTL(geom, statusColours[status])
	addedCallback(mesh);
}

function loadMeshSTL( geometry, color ) {
	const material = new MeshStandardMaterial( {
		color: color,
		opacity: 1,
		transparent: true,
	});

	const mesh = new Mesh( geometry, material );

	// fit into frame
	mesh.scale.multiplyScalar( 0.2 );
	mesh.rotation.x = - Math.PI / 2;

	// wireframe
	const geo = new EdgesGeometry( mesh.geometry ); // or WireframeGeometry
	const mat = new LineBasicMaterial( { color: 0xffffff, linewidth: 2 } );
	const wireframe = new LineSegments( geo, mat );
	mesh.add( wireframe );
	return mesh;
}

export function setVisibleObjects(visible) {
	visibleObjects = visible;
}

export function onElementMouseMove( event ) {
	event.preventDefault();

	// calculate mouse position in normalized coordinates (to container div not document)
	// (-1 to +1) for both components

	mouse.x = ( (event.pageX - event.target.offsetLeft) / event.target.clientWidth ) * 2 - 1;
	mouse.y = - ( (event.pageY - event.target.offsetTop) / event.target.clientHeight ) * 2 + 1;
}

export const getKeyboardHandler = (dispatch, items) => {
	return ( ev ) => {
		switch (ev.key || String.fromCharCode(ev.keyCode || ev.charCode)) {

			case 'h':
				if (INTERSECTED) {
					INTERSECTED.material.visible = false;
					INTERSECTED.material.needsUpdate = true;
				}
				dispatch(setMeshVisibility(INTERSECTED.geometry.name, false));
				break;

			case 'r':
				items.forEach((item) => {
					item.mesh.material.visible = true;
					item.mesh.material.needsUpdate = true;
					dispatch(setMeshVisibility(item.Guid, true));
				})
				break;
		}
	}
}


// curry in the dispatch function
export function getAnimationFunction(dispatch) {
	return function animateViewer() {
		controls.update();

		// update the picking ray with the camera and mouse position
		raycaster.setFromCamera(mouse, camera);

		// calculate objects intersecting the picking ray
		var intersects = raycaster.intersectObjects(visibleObjects);

		if (intersects.length > 0) {
			if (INTERSECTED != intersects[0].object) {
				if (INTERSECTED) {
					INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
				}
				INTERSECTED = intersects[0].object;
				INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
				INTERSECTED.material.emissive.setHex(0x808080);
				dispatch(highlight(INTERSECTED.geometry.name));
			}
		} else {
			if (INTERSECTED) {
				INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
				INTERSECTED = null;
				dispatch(unhighlight());
			}
		}

		renderer.render(scene, camera);
		requestAnimationFrame(animateViewer);
	}
}
