import {combineReducers} from 'redux';
import user from './userReducer';
import contact from './contactReducer';
import ui from './uireducer';
import group from './groupReducer';
import {USER_LOGOUT} from '../constants';
const appReducer = combineReducers({
	user,
	contact,
	ui,
	group
});

const rootReducer = (state,action) => {
	if(action.type===USER_LOGOUT){
		state = undefined
	}
	return appReducer(state,action);
}

export default rootReducer;

