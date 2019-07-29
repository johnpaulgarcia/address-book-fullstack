exports.shorthands = undefined;

exports.up = (pgm) => {
	pgm.createTable('users',{
		id: {type: 'serial',primaryKey: true},
		user: {type: 'text',unique: true},
		password: {type: 'text'}
	})
};

exports.down = (pgm) => {

};
