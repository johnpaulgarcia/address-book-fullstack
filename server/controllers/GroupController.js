exports.getGroup = (req,res,next) => {
	let db = req.app.get('db');
	let {userid} = req.params;
	db.groups.find({userid})
		.then(groups=>{
			res.send(groups);
		})
		.catch(err=>{
			console.error(err);
			res.status(500).end();
		})
}

exports.addGroup = (req,res,next) => {
	let db = req.app.get('db');
	let {userid,name} = req.body;
	db.groups.save({userid,name})
		.then(group=>{
			res.status(201).end();
		})
		.catch(err=>{
			console.error(err);
			res.status(500).end();
		})
}