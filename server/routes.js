const router = require('express').Router();
const srouter = require('express').Router();
const UserController = require('./controllers/UserController');
router.route('/').get((req,res,next)=>{
	res.send('API RUNNING');
});

router.route('/register').post(UserController.register);
router.route('/login').post(UserController.login);

module.exports = {router,srouter}