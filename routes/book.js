var express = require('express');

var router = express.Router();


var Book = require('../controllers/bookControllers');




router.post('/findBook', Book.findBook);
router.post('/getBookAll', Book.getBookAll);

router.post('/findBookAuthor', Book.findBookAuthor);
router.post('/findBookPrice', Book.findBookPrice);
router.post('/findBookIsbn', Book.findBookIsbn);
router.post('/findBookId', Book.findBookId);
router.post('/deleteBookId', Book.deleteBookId);
router.post('/addBook', Book.addBook);



module.exports = router;
