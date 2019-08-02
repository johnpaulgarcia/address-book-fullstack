const constants = require('../constants');
const {groupBy} = require('lodash');
let defaultState = {
	bygroup: {}
}

module.exports = (state=defaultState,action) => {
	switch(action.type) {

		case constants.BY_GROUP: {
				let bg = action.bygroup;
				let newg = groupBy(bg,(grp)=>{
					return grp.name
				})
				console.log(JSON.stringify(newg))
				return {
					bygroup: newg
				}
		}

		default: 
			return state;
	}
}