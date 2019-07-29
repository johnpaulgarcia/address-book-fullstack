const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../secret');
exports.register = (req,res,next) => {
	 let {user,password} = req.body;
	 let db = req.app.get('db');
	 argon2.hash(password)
	 	.then((hash)=>{
	 		db.users.save({user,password:hash},{fields: ['user']})
	 		.then(user=>{
	 			const token = jwt.sign({'userId':user.id},secret);
	 			res.json({...user,token})
	 		})

	 		.catch((err)=>{
	 			console.error(err.message);
	 			if (['duplicate key value violates unique constraint "users_user_key"'].includes(err.message)){return res.status(403).end()} 
	 			res.status(500).end();
	 		})
	 	})
}

exports.login = (req,res,next) => {
	let {user,password} = req.body;
	let db = req.app.get('db');
	
		db.users.findOne({user})
			.then((user)=>{
				if(!user) throw new Error('Invalid Username');
				return argon2.verify(user.password,password).then((valid)=>{
					if(!valid) throw new Error('Invalid Password')
					const token = jwt.sign({'userId':user.id},secret);
					delete user.password;
					res.status(201).json({...user,token})
				})
			}).catch(err=>{
		if(['Invalid Password','Invalid Username'].includes(err.message)){
			return res.status(403).json({'error':err.message});
		}
		console.error(err);
		res.status(500).end();
	});
	
}