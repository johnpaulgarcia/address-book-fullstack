const constants = require('../constants');
let defaultState = {
	groups: [],
}
module.exports = (state=defaultState,action) => {
	switch(action.type){
		case constants.GROUP_UPDATED: {
			return {
				groups: action.groups
			}
		}


		default:
			return state
	}
}