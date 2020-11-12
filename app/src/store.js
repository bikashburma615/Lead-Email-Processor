import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { compose, createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

const enhancers = [applyMiddleware(thunk, promise)];

if(process.env.REACT_APP_ENV !== 'production' && window['__REDUX_DEVTOOLS_EXTENSION__']) {
	enhancers.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
}

const store = createStore(rootReducer, compose(...enhancers));

export { store };