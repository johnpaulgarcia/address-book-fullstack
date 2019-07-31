const jwt = require('jsonwebtoken');
const secret = require('./secret');

exports.checkPoint = (req,res,next) => {
	if(!req.headers.authorization) {return res.status(403).end()}
	try{

		let key = req.headers.authorization.split(' ')[1];
		jwt.verify(key,secret);
		next();
	}
	catch(err){
		res.status(403).end();
	}

}