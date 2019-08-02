exports.shorthands = undefined;

exports.up = (abc) => {

	abc.createTable('groups',{
		groupid: {type: 'serial',primaryKey: true},
		userid: {type: 'integer',notNull:false,references:'"users"'},
		name: {type: 'text'}
	})

	abc.createTable('address',{
		userid: {type: 'integer',notNull: false,references: '"users"'},
		contactid: {type: 'integer',notNull: false,references: '"contact"'},
		groupid: {type:'integer',notNull:false}
	})
};

exports.down = (pgm) => {

};
