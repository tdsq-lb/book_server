var dbConfig = require('../utils/dbConfig')



/**
 * 获取总条数
 */
let getBookCount = async () => {
  let sql = `select count(*) as nums from book_info`;
  let result = await dbConfig.SySqlConnect(sql, []);
  return result[0].nums;
}


/**
 * 获取有条件的总条数
 */
let getBookWhereCount = async (table, where) => {
  let sql = `select count(*) as nums from ${table} where ${where}`;
  let result = await dbConfig.SySqlConnect(sql, []);
  return result[0].nums;
}



//获取图书列表  条数/页码
getBookAll = async (req, res) => {
  let {
    pagenum, //当前页数
    pagesize //获取条数
  } = req.body;

  pagenum = pagenum ? pagenum : 1;
  pagesize = pagesize ? Number(pagesize) : 5;
  let start = (pagenum - 1) * pagesize;

  let sql = `select * from book_info limit ?,?`;
  let sqlAll = [start, pagesize];
  let result = await dbConfig.SySqlConnect(sql, sqlAll);

  let total = await getBookCount();

  if (result.length) {
    res.send({
      'code': 200,
      'msg': '获取图书列表成功',
      'data': {
        'result': result,
        'total': total,
        'pagenum': pagenum,
        'pagesize': pagesize
      }
    })
  } else {
    res.send({
      'code': 400,
      'msg': '图书列表为空或该表不存在',
    })
  }
}


//根据名称查找书籍
findBook = async (req, res) => {
  let {
    bookname, //名称
    pagenum, //当前页数
    pagesize //获取条数
  } = req.body;

  pagenum = pagenum ? pagenum : 1;
  pagesize = pagesize ? Number(pagesize) : 5;
  let start = (pagenum - 1) * pagesize;



  let sql = `select * from book_info where name like '%${bookname}%' limit ${start},${pagesize}`;
  let result = await dbConfig.SySqlConnect(sql, []);

  //获取总条数
  let total = await getBookWhereCount('book_info', `name like '%${bookname}%'`);

  if (result.length) {
    res.send({
      'code': 200,
      'msg': '获取成功',
      'data': {
        'result': result,
        'total': total,
        'pagenum': pagenum,
        'pagesize': pagesize
      }
    })
  } else {
    res.send({
      'code': 400,
      'msg': '获取失败'
    })
  }
}



//根据作者查找书籍
findBookAuthor = async (req, res) => {
  let {
    author
  } = req.body;

  let sql = `select * from book_info where author like '${author}%'`;
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
      'msg': '获取失败'
    })
  }
}


//根据价钱进行筛选书籍
findBookPrice = async (req, res) => {
  let {
    price
  } = req.body;

  let sql = `select * from book_info where price <=?`;
  let result = await dbConfig.SySqlConnect(sql, [price]);
  if (result) {
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


//根据图书ISBN编号查找
findBookIsbn = async (req, res) => {
  let {
    isbn
  } = req.body;

  let sql = `select * from book_info where ISBN = ?`;
  let result = await dbConfig.SySqlConnect(sql, [isbn]);
  if (result.length) {
    res.send({
      'code': 200,
      'msg': '获取成功',
      'data': result
    })
  } else {
    res.send({
      'code': 400,
      'msg': '不存在'
    })
  }
}

//根据图书id查找
findBookId = async (req, res) => {
  let {
    id
  } = req.body;

  let sql = `select * from book_info where id = ?`;
  let result = await dbConfig.SySqlConnect(sql, [id]);
  if (result.length) {
    res.send({
      'code': 200,
      'msg': '获取成功',
      'data': result
    })
  } else {
    res.send({
      'code': 400,
      'msg': '不存在'
    })
  }
}


//删除书籍
deleteBookId = async (req, res) => {
  let {
    id
  } = req.body;

  let sql = `delete from book_info where id=?`;
  let result = await dbConfig.SySqlConnect(sql, [id])
  if (result.affectedRows == 1) {
    res.send({
      'code': 200,
      'msg': '删除成功'
    })
  } else {
    res.send({
      'code': 400,
      'msg': '删除失败'
    })
  }
}



addBook = async (req, res) => {
  let {
    name,
    author,
    press,
    press_time,
    price,
    isbn,
    desc
  } = req.body;

  let sql = 'insert into book_info(name,author,press,press_time,price,ISBN,`desc`) values(?,?,?,?,?,?,?)';
  let sqlAll = [name,
    author,
    press,
    press_time,
    price,
    isbn,
    desc
  ];

  let result = await dbConfig.SySqlConnect(sql, sqlAll);
  if (result.affectedRows == 1) {
    res.send({
      'code': 200,
      'msg': '添加成功'
    })
  } else {
    res.send({
      'code': 400,
      'msg': '添加失败'
    })
  }
}


module.exports = {
  getBookAll,
  findBook,
  findBookAuthor,
  findBookPrice,
  findBookIsbn,
  findBookId,
  deleteBookId,
  addBook
}
