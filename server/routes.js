const router = require('express').Router();
const srouter = require('express').Router();
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
router.route('/').get((req,res,next)=>{
	res.send('API RUNNING');
});

router.route('/signup').post(UserController.register);
router.route('/signin').post(UserController.login);
router.route('/getcontacts/:userid').get(AddressController.getContacts);

srouter.route('/addcontact').post(AddressController.addContact);
srouter.route('/updatecontact').patch(AddressController.updateContact);
srouter.route('/deletecontact').post(AddressController.deleteContact);
srouter.route('/searchcontact/:userid').get(AddressController.searchContact);

module.exports = {router,srouter}