var express = require('express');

var router = express.Router();

var dbConfig = require('../utils/dbConfig')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


router.get('/', function (req, res, next) {
  let sql = `select * from user`;
  let sqlArr = [];
  dbConfig.sqlConnect(sql, sqlArr, function (err, data) {
    if (err) {
      console.log('连接失败')
    } else {
      res.send({
        'code': 400,
        'msg': '啊飒飒大大',
        'data': data
      })
    }
  })

});

module.exports = router;
