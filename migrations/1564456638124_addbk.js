exports.shorthands = undefined;

exports.up = (abc) => {
	abc.createTable('address',{
		userid: {type: 'integer',notNull: false,references: '"users"'},
		contactid: {type: 'integer',notNull: false,references: '"contact"'},
	},{constraints: {onDelete: '"cascade"'}})
};

exports.down = (pgm) => {

};
