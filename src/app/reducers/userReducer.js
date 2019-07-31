const defaultState = {};
const constants =  require('../constants');
module.exports = (state=defaultState,action) => {
	switch(action.type){
		case constants.USER_AUTH: {
			console.log("LOGGED",action.user);
			return {
				user: action.user
			}
		}

		case constants.AUTH_FAILED: {
			return {
				error: action.error
			}
		}

		default:
			return state
	}
}