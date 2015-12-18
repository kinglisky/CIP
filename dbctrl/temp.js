var mysql = require('mysql'),
    sqlconfig = require('../conf/config.json'),
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
dbctrl.sigup = function(username, password, repassword, callback) {
    var result = "";
    if (username && password && repassword) {
        if (password == repassword) {
            conn = mysql.createConnection(sqlconfig);
            conn.connect();
            var query = 'SELECT * FROM users WHERE username="' + username + '";';
            conn.query(query, function(err, rows, fields) {
                    if (err) {
                        console.log("查询出错：" + err);
                        return;
                    }
                    console.log("用户唯一性检查");
                    console.log(rows);
                    if (rows.length == 0) {
                        query = 'INSERT INTO users(username,userpassword)VALUE("' + username + '",MD5("' + password + '"));';
                        conn.query(query, function(err, rows, fields) {
                            if (err) {
                                console.log("查询出错：" + err);
                                result = "查询出错：" + err;
                                callback(result);
                                conn.end();
                                return;
                            }
                            if (rows) {
                                console.log("注册成功");
                                console.log(rows);
                                result = 200;
                                conn.end();
                                callback(result);
                            }
                            else{
                                conn.end();
                            }
                        });
                    } else {
                        result = "用户名已经存在！";
                        conn.end();
                    }
                    callback(result);
                });

    } else {
        result = "两次输入的密码不一致！";
        callback(result);
    }
} else {
    result = "注册信息不完整！";
    callback(result);
}
return;
};
dbctrl.userUni=function(username,callback){
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    var query = 'SELECT * FROM users WHERE username="' + username + '";';
    conn.query(query, function(err, rows, fields) {
        if (err){
            console.log("查询出错：" + err);
            result = "查询出错：" + err;
        }
        if(rows.length == 0){
            result ==200;
        }
        conn.end();
        callback(result);
        return;
    });
};
module.exports = dbctrl;
