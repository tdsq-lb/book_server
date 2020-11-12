var dbConfig = require('../utils/dbConfig')


/**
 * 该用户是否存在
 * @param {*} name 
 * false/该用户
 */
let isExist = async (name) => {
  let sql = `select * from user where name=?`;
  let sqlArr = [name];
  let result = await dbConfig.SySqlConnect(sql, sqlArr);
  if (result.length) {
    return result[0];
  } else {
    return false;
  }
}


/**
 * 该用户是否存在
 * @param {*} id 
 * false/该用户
 */

let isExistId = async (id) => {
  let sql = `select * from user where id=?`;
  let sqlArr = [id];
  let result = await dbConfig.SySqlConnect(sql, sqlArr);
  if (result.length) {
    return result[0];
  } else {
    return false;
  }
}








//用户名和密码登录
login = async (req, res) => {

  let {
    name,
    pwd
  } = req.body;
  console.log(name, pwd)
  let result = await isExist(name);
  // 用户存在
  if (result) {
    // 匹马匹配
    if (result.pwd == pwd) {
      res.send({
        'code': 200,
        'msg': '登录成功',
        'data': result
      })
    } else {
      res.send({
        'code': 400,
        'msg': '密码错误'
      })
    }
  } else {
    res.send({
      'code': 400,
      'msg': '该用户不存在'
    })
  }
}

//注册
register = async (req, res) => {
  let {
    name,
    pwd,
    clas,
    admin
  } = req.body;

  let result = await isExist(name);
  console.log(name,
    pwd,
    clas,
    admin)
  if (result) {
    res.send({
      'code': 400,
      'msg': '注册失败，用户已经存在'
    })
  } else {
    if (name && pwd && clas) {
      let sql = `insert into user(pwd,name,class,admin,last_login_time) values(?,?,?,?,?)`;
      let sqlArr = [pwd, name, clas, admin, new Date()];
      let result = await dbConfig.SySqlConnect(sql, sqlArr);
      console.log(result.affectedRows)
      if (result.affectedRows == 1) {
        res.send({
          'code': 200,
          'msg': '注册成功'
        })
      } else {
        res.send({
          'code': 400,
          'msg': '注册失败!'
        })
      }
    } else {
      res.send({
        'code': 400,
        'msg': '没有输入有效的信息！'
      })
    }
  }
}


//修改密码
editUserpass = async (req, res) => {
  let {
    id,
    pwd,
    newpwd
  } = req.body;

  let result = await isExistId(id);
  if (result) {
    if (result.pwd == pwd) {
      let sql = `update user set pwd=? where id=?`;
      let sqlArr = [newpwd, id];
      let data = await dbConfig.SySqlConnect(sql, sqlArr);
      if (data.affectedRows == 1) {
        res.send({
          'code': 200,
          'msg': '修改成功'
        })
      } else {
        res.send({
          'code': 400,
          'msg': '修改失败'
        })
      }
    } else {
      res.send({
        'code': 400,
        'msg': '密码错误'
      })
    }
  } else {
    res.send({
      'code': 400,
      'msg': '该用户名不存在'
    })
  }

}



// 修改用户信息  名称/状态/身份
editUserinfo = async (req, res) => {
  let {
    id,
    name,
    clas,
    admin
  } = req.body;


  let sql = `update user set name=?,class=?,admin=? where id=?`;
  let sqlArr = [name, clas, admin, id];
  let data = await dbConfig.SySqlConnect(sql, sqlArr);
  console.log(data, data.affectedRows)
  if (data.affectedRows == 1) {
    res.send({
      'code': 200,
      'msg': '修改成功'
    })
  } else {
    res.send({
      'code': 400,
      'msg': '修改失败'
    })
  }

}


//获取当前用户信息
getUserInfo = async (req, res) => {
  let {
    name
  } = req.body;
  let result = await isExist(name);
  console.log(result, name)
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



//获取所有用户信息
getUserAll = async (req, res) => {
  let sql = `select * from user`;
  let sqlArr = [];
  let result = await dbConfig.SySqlConnect(sql, sqlArr);
  res.send({
    'code': 200,
    'msg': '获取成功',
    'data': result
  })
}

//修改用户的丢失状态
editUserStatus = async (req, res) => {
  let {
    id,
    status
  } = req.body;


  let sql = `update user set status=? where id=?`;
  let sqlArr = [status, id];
  let data = await dbConfig.SySqlConnect(sql, sqlArr);
  if (data.affectedRows == 1) {
    res.send({
      'code': 200,
      'msg': '修改成功'
    })
  } else {
    res.send({
      'code': 400,
      'msg': '修改失败'
    })
  }
}

//查找用户
findUsername = async (req, res) => {
  let {
    name
  } = req.body;
  let sql = `select * from user where name like '${name}%'`;
  let result = await dbConfig.SySqlConnect(sql, []);
  if (result.length) {
    res.send({
      'code': 200,
      'msg': '获取成功',
      'data': result
    })
  } else {
    res.send({
      'code': 400,
      'msg': '用户不存在',
    })
  }

}

//删除用户
deleteUser = async (req, res) => {
  let {
    id
  } = req.body;
  let sql = `delete from user where id=?`;
  let sqlArr = [id];
  let data = await dbConfig.SySqlConnect(sql, sqlArr);
  console.log(id, data)
  if (data.affectedRows == 1) {
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

//统计用户
userDataCount = async (req, res) => {
  let sql = 'SELECT COUNT(*) AS count FROM `user` WHERE admin=0 UNION ALL SELECT COUNT(*) FROM `user` WHERE admin=1';
  let result = await dbConfig.SySqlConnect(sql, []);
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




module.exports = {
  login,
  register,
  editUserpass,
  editUserinfo,
  editUserStatus,
  getUserInfo,
  getUserAll,
  findUsername,
  deleteUser,
  userDataCount
}
