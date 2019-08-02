const jwt = require('jsonwebtoken');
exports.addContact = (req,res,next) => {
	let db = req.app.get('db');
	let groupid = req.body.groupid;
	delete req.body.groupid;
	let contact = {
		...req.body,
		address: [
			{
				userid: req.body.userid,
				contactid: undefined,
				groupid
			}
		]
	}
	
	delete contact.userid;

	db.contact.save(contact,{deepInsert: true})
		.then(contact=>{
			res.status(201).end();
		}).catch(err=>{
			console.error(err);
			res.status(500).end();
		})
}

exports.getContacts = (req,res,next) => {
	let db = req.app.get('db');
	let sort = req.query.sort;
	db.query(`select * from contact inner join address on contact.contactid = address.contactid 
					where address.userid=${req.params.userid}
						order by contact.last_name ${sort}`,
	[],
	{
		decompose: {
			contact: {
				pk: 'contactid',
				columns: 
					{
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
			console.error(err);
			res.status(500).end();
		});
}

exports.updateContact = (req,res,next) => {
	let db = req.app.get('db');
	let {contactid} = req.body;
	delete req.body.contactid;
	db.contact.update(contactid,{...req.body})
		.then(contact=>{
			res.status(201).send(contact);
		})
		.catch(err=>{
			console.error(err);
			res.status(500).end();
		});
}

exports.deleteContact = (req,res,next) => {
	let db = req.app.get('db');
	let {contactid} = req.body;
	db.address.destroy({contactid})
		.then(response=>{
			db.contact.destroy({contactid})
				.then(response=>{
					res.status(201).send("Deleted.");
				})
		})
		.catch((err)=>{
		console.error(err);
		res.status(500).end();
	});
}

exports.searchContact = (req,res,next) => {
	let db = req.app.get('db');
	let {q} = req.query;
	db.query(`select * from contact inner join address on contact.contactid = address.contactid 
					where address.userid=${req.params.userid} and (first_name LIKE '%${q}%' or last_name LIKE '%${q}%')`,
	[],
	{
		decompose: {
			contact: {
				pk: 'contactid',
				columns: 
					{
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
			console.error(err);
			res.status(500).end();
		});
}