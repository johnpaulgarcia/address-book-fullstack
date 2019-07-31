const jwt = require('jsonwebtoken');
exports.addContact = (req,res,next) => {
	let db = req.app.get('db');
	let contact = {
		...req.body,
		address: [
			{
				userid: req.body.userid,
				contactid: undefined
			}
		]
	}
	
	delete contact.userid;

	db.contact.save(contact,{deepInsert: true})
		.then(contact=>{
			res.send(contact);
		}).catch(err=>{
			console.error(err);
			res.status(500).end();
		})
}

exports.getContacts = (req,res,next) => {
	let db = req.app.get('db');

	db.query(`select * from contact inner join address on contact.contactid = address.contactid where address.userid=${req.params.userid}`,
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


	// db.address.find({userid:req.params.userid},{
	// 	decompose: {
	// 		pk: 'userid',
	// 		columns: ['userid'],
	// 		contact: {
	// 			pk: 'contactid',
	// 			columns: {
	// 				first_name:'firstname',
	// 				last_name:'lastname'
	// 			}
	// 		},
	// 		array: true
	// 	}
	// }).then(contact=>{
	// 	console.log(contact);
	// })
}