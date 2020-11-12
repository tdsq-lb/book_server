var express = require('express');
var router = express.Router();


var User = require('../controllers/userControllers');


/* GET users listing. */
router.post('/login', User.login);
router.post('/register', User.register);
router.post('/editUserpass', User.editUserpass);
router.post('/editUserinfo', User.editUserinfo);
router.post('/editUserStatus', User.editUserStatus);
router.post('/getUserInfo', User.getUserInfo);
router.get('/getUserAll', User.getUserAll);
router.post('/findUsername', User.findUsername);
router.post('/deleteUser', User.deleteUser);
router.get('/userDataCount', User.userDataCount);


module.exports = router;
