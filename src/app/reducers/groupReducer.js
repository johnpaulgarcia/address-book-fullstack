const constants = require('../constants');
module.exports = (state={},action) => {
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