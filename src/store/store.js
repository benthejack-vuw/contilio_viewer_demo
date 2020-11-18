import sessionReducer, { sessionInitialState } from './session/reducer';
import viewerReducer, { viewerInitialState } from './viewer/reducer';
import { combineReducers, compose, createStore } from 'redux';

const reduxDevCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = reduxDevCompose ? reduxDevCompose({ trace: true }) : compose;

const store = createStore(combineReducers({
		session: sessionReducer,
		viewer: viewerReducer,
	}),
	{
		session: sessionInitialState,
		viewer: viewerInitialState,
	},
	composeEnhancers(),
);

export default store;
