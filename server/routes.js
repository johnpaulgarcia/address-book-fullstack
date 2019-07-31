const router = require('express').Router();
const srouter = require('express').Router();
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
router.route('/').get((req,res,next)=>{
	res.send('API RUNNING');
});

router.route('/signup').post(UserController.register);
router.route('/signin').post(UserController.login);
srouter.route('/addcontact').post(AddressController.addContact);
router.route('/getcontacts/:userid').get(AddressController.getContacts);

module.exports = {router,srouter}