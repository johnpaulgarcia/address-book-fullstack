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
router.route('/contact/get/:userid').get(AddressController.getContacts);

srouter.route('/contact').post(AddressController.addContact);
srouter.route('/contact').patch(AddressController.updateContact);
srouter.route('/contact/:contactid').delete(AddressController.deleteContact);
srouter.route('/contact/:userid').get(AddressController.searchContact);
srouter.route('/groups/:userid').get(GroupController.getGroup);
srouter.route('/groups').post(GroupController.addGroup);
srouter.route('/groups/contact/:userid').get(GroupController.getByGroup);
srouter.route('/groups').patch(GroupController.updateGroup);
srouter.route('/groups/:groupid').delete(GroupController.deleteGroup);

module.exports = {router,srouter}