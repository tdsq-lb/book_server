var express = require('express');

var router = express.Router();

var Borrow = require('../controllers/borrowControllers');


router.post('/getBorrowList', Borrow.getBorrowList);
router.post('/findBorrowUser', Borrow.findBorrowUser);
router.post('/addBookStatus', Borrow.addBookStatus);
router.post('/addBorrow', Borrow.addBorrow);



module.exports = router;
