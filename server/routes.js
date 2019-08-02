const router = require('express').Router();
const srouter = require('express').Router();
const UserController = require('./controllers/UserController');
const AddressController = require('./controllers/AddressController');
const GroupController = require('./controllers/GroupController');
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
srouter.route('/groups/:userid').get(GroupController.getGroup);
srouter.route('/groups/add').post(GroupController.addGroup);
srouter.route('/groups/contact/:userid').get(GroupController.getByGroup);

module.exports = {router,srouter}