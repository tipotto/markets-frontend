var mysql = require("mysql");

module.exports = {
  conn: null,

  // MySQLへ接続
  connect: function() {
    this.conn = mysql.createConnection({
      host: "db_hostname",
      user: "db_username",
      password: "db_password",
      database: "db_name"
    });
    this.conn.connect(function(err) {
      if (err) {
        // MySQLへ接続失敗
      } else {
        // MySQLへ接続成功
      }
    });
  },

  // 1件取得用メソッド
  getOne: function(query, params, callback) {
    this.conn.query(query, params, function(err, rows) {
      if (err) throw new Error();
      else callback(rows.length < 1 ? null : rows[0]);
    });
  },

  // 複数件取得用メソッド
  getAll: function(query, params, callback) {
    this.conn.query(query, params, function(err, rows) {
      if (err) throw new Error();
      else callback(rows);
    });
  },

  // insert実行用メソッド
  insert: function(table, data, callback) {
    this.conn.query("insert into " + table + " set ?", data, function(
      err,
      result,
      fields
    ) {
      if (err) throw new Error();
      else callback(result.insertId);
    });
  }
};
