const defaultState = {};
const constants = require('../constants');
module.exports = (state=defaultState,action) => {
	switch(action.type){
		case constants.CONTACT_UPDATED: {
			return {
				contact: action.contact
			}
		}

		break;

		default:
			return state
	}
}