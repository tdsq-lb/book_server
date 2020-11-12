var dbConfig = require('../utils/dbconfig');


//获取用户借走的图书列表  //通过name
findBorrowUser = async (req, res) => {
  let {
    user_id
  } = req.body;

  let sql = 'SELECT t.*,b.`name` from borrow_list as t LEFT JOIN book_info as b ON t.book_id=b.id WHERE t.user_id=? AND t.back_date=0000-00-00;';


  let sqlArr = [user_id];

  let result = await dbConfig.SySqlConnect(sql, sqlArr);
  console.log(result)
  if (result.length) {
    res.send({
      'code': 200,
      'msg': '获取成功',
      'data': result
    })
  } else {
    res.send({
      'code': 400,
      'msg': '获取失败'
    })
  }
}

getBorrowList = async (req, res) => {

  let sql = 'SELECT b.name as bookName,b.author as bookAuthor,b.press as bookPress,u.`name` as userName,t.* FROM borrow_list t LEFT JOIN `user`u ON t.user_id=u.id LEFT JOIN book_info AS b ON t.book_id = b.id;'

  let result = await dbConfig.SySqlConnect(sql, []);
  if (result) {
    res.send({
      'code': 200,
      'msg': '获取成功',
      'data': result
    })
  } else {
    res.send({
      'code': 400,
      'msg': '获取失败',
    })
  }
}

//借书
addBorrow = async (req, res) => {
  let {
    book_id,
    user_id,
  } = req.body;

  let sql = `insert into borrow_list (book_id,user_id,borrow_date) values(?,?,CURRENT_DATE())`;
  let sqlArr = [book_id, user_id];

  let result = await dbConfig.SySqlConnect(sql, sqlArr);
  if (result.affectedRows == 1) {
    res.send({
      'code': 200,
      'msg': '插入成功'
    })
  } else {
    res.send({
      'code': 400,
      'msg': '插入失败'
    })
  }
}



//还书

addBookStatus = async (req, res) => {
  let {
    user_id,
    book_id
  } = req.body;
  let sql = `UPDATE borrow_list SET back_date=CURRENT_DATE() WHERE back_date=0000-00-00 AND user_id=?  AND book_id=?`;
  let sqlArr = [user_id, book_id];

  let result = await dbConfig.SySqlConnect(sql, sqlArr);
  if (result.affectedRows == 1) {
    res.send({
      'code': 200,
      'msg': '还书成功'
    })
  } else {
    res.send({
      'code': 400,
      'msg': '还书失败'
    })
  }

}



// SELECT b.name as bookName,b.author as bookAuthor,b.press as bookPress,u.`name` as userName,t.* FROM borrow_list t LEFT JOIN `user`u ON t.user_id=u.id LEFT JOIN book_info AS b ON t.book_id = b.id;






module.exports = {
  getBorrowList,
  findBorrowUser,
  addBookStatus,
  addBorrow
}
