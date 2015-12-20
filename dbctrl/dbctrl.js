var mysql = require('mysql'),
    sqlconfig = require('../conf/config'),
    conn = {},
    crypto = require('crypto'),
    dbctrl = {};
dbctrl.md5 = function(data) {
    return crypto.createHash('md5').update(data).digest('hex');
};
dbctrl.login = function(username, password, callback) {
    var query = 'select * from users where username="';
    query += username + '" and userpassword="' + dbctrl.md5(password) + '"';
    var result = {};
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("查询出错：" + err);
            return;
        }
        if (rows.length == 1) {
            result = rows[0];
        } else {
            result = false;
        }
        conn.end();
        callback(result);
    });
}
/*注意：多层的嵌套与事件回调很可能造成后面的重复触发callback*/
dbctrl.sigup = function(username, password, repassword, callback) {
    var result = "";
    if (username && password && repassword) {
        if (password == repassword) {
            dbctrl.userUni(username, function(mark) {
                if (mark != 200) {
                    result = mark;
                    callback(result);
                    return;
                }
                dbctrl.userSig(username, password, function(mark) {
                    result = mark;
                    callback(result);
                    return;
                });
            });
        } else {
            result = "两次输入的密码不一致！";
            callback(result);
            return;
        }
    } else {
        result = "注册信息不完整！";
        callback(result);
        return;
    }
};
/*注册用户名唯一性检查*/
dbctrl.userUni = function(username, callback) {
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    var mark="";
    var query = 'SELECT * FROM users WHERE username="' + username + '";';
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("查询出错：" + err);
            mark = "查询出错：" + err;
        }
        if (rows.length == 0) {
            mark= 200;
        } else {
            mark == "用户名已经存在";
        }
        conn.end();
        callback(mark);
        return;
    });
};
/*注册*/
dbctrl.userSig = function(username, password, callback) {
    var mark="";
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    query = 'INSERT INTO users(username,userpassword)VALUE("' + username + '",MD5("' + password + '"));';
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("查询出错：" + err);
            mark = "查询出错：" + err;
        }
        if (rows) {
            console.log("注册成功");
            console.log(rows);
            mark = 200;
        } else {
            mark = "系统注册出现问题";
        }
        conn.end();
        callback(mark);
        return;
    });

};
module.exports = dbctrl;
