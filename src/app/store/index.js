import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage' 
import reducer from '../reducers';

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig,reducer);

export const configureStore=()=>{
	let store = createStore(
			persistedReducer,
			applyMiddleware(thunk)
		);
	let persistor = persistStore(store);
	return {store,persistor}
}