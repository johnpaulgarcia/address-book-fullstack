const defaultState = {};
const constants =  require('../constants');
module.exports = (state=defaultState,action) => {
	switch(action.type){
		case constants.USER_AUTH: {
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