const constants = require('../constants');
module.exports = (state={},action)=>{
	switch(action.type){
		case constants.CREATE_MODAL: {
			return {
				open: action.open
			}
		}

		default: 
			return state;
	}
}