import {combineReducers} from 'redux';
import user from './userReducer';
import contact from './contactReducer';
import shit from './shitreducer';
export default combineReducers({
	user,
	contact,
	shit
})