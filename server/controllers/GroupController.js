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

exports.getByGroup = (req,res,next) => {
	let db = req.app.get('db');
	let userid = req.params.userid;
	db.query(`
			select * from contact inner join address on contact.contactid = address.contactid
			inner join users on users.userid = address.userid inner join groups on address.groupid = groups.groupid
			where users.userid = ${userid}
		`,[],
		{
			decompose: {
				groups: {
					pk: 'contactid',
					columns: {
						userid: 'userid',
						name: 'name',
						contactid:'contactid',
						first_name:'firstname',
						last_name: 'lastname',
						email: 'email',
						home_phone:'home',
						work_phone:'work',
						mobile_phone:'mobile',
						city:'city',
						postal_code:'postcode',
						state_or_province:'state',
						groupid:'groupid',
						country:'country'
					},
					array: true
				}
			}
		}
		).then(response=>{
			res.send(...response);
		})
		.catch(err=>{
			console.log(err);
			res.status(500).end();
		})
}