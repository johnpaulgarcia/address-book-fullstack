import {combineReducers} from 'redux';
import user from './userReducer';
import contact from './contactReducer';
export default combineReducers({
	user,
	contact
})