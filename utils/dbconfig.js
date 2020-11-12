const mysql = require('mysql');

module.exports = {
  config: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'mybook'
  },
  sqlConnect: function (sql, sqlArr, callback) {
    var pool = mysql.createPool(this.config);
    pool.getConnection((err, conn) => {
      if (err) {
        console.log('---数据库连接失败---')
        return;
      }

      conn.query(sql, sqlArr, callback);

      //释放
      conn.release();
    })
  },
  SySqlConnect: function (sql, sqlArr) {
    return new Promise((resolve, reject) => {
      var pool = mysql.createPool(this.config);
      pool.getConnection((err, conn) => {
        if (err) {
          reject(err)
        } else {
          conn.query(sql, sqlArr, (err, data) => {
            if (err) {
              reject(err) //sql失败回调
            } else {
              resolve(data) //sql成功回调
            }
          });
          //释放
          conn.release();
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  }
}
