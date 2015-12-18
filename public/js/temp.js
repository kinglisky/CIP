var mysql = require('mysql'),
    sqlconfig = require('../conf/config.json'),
    conn = {},
    dbinteraction = {};
dbinteraction.rGoodClassMenu = function(callback) {
    var query = 'SELECT * FROM goodsclass ORDER BY gclasscode DESC;';
    var result = [];
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("查询出错：" + err);
            return;
        }
        if (rows.length > 0) {
            rows.forEach(function(item, i) {
                var goodsclass = {
                    "name": item.gclassname,
                    "code": item.gclasscode
                };
                result.push(goodsclass);
            });
        } else {
            result = false;
        }
        // console.log(result);
        conn.end();
        callback(result);
    });
}
dbinteraction.gcUni = function(gclassname, callback) {
    var query = 'SELECT * FROM goodsclass WHERE gclassname="' + gclassname + '";';
    var result = false;
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("查询出错：" + err);
            result = "查询出错！";
            callback(result);
            return;
        }
        if (rows.length == 0) {
            result = 200;
        } else {
            result = "商品分类已存在！";
        }
        conn.end();
        callback(result);
        return;
    });
}
dbinteraction.addGclass = function(gclassname, callback) {
    dbinteraction.gcUni(gclassname, function(mark) {
        if (mark == 200) {
            var query = 'INSERT INTO goodsclass(gclassname)VALUE("' + gclassname + '");';
            var result = false;
            conn = mysql.createConnection(sqlconfig);
            conn.connect();
            conn.query(query, function(err, rows, fields) {
                if (err) {
                    console.log("查询出错：" + err);
                    result = "插入出错！";
                    callback(result);
                    return;
                }
                if (rows) {
                    console.log("查询结果!" + rows);
                    console.log(rows);
                    result = "Ye";
                }
                conn.end();
                callback(result);
                return;
            });
        } else {
            callback(mark);
            return;
        }
    });

}
dbinteraction.getGcode = function(gclassname, callback) {
    var query = 'SELECT gclasscode FROM goodsclass WHERE gclassname="' + gclassname + '";';
    var result = false;
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("查询出错：" + err);
            err = "插入出错！";
            callback(err, null);
            return;
        }
        if (rows) {
            result = rows[0].gclasscode;
            console.log("查询结果-code!" + result);
        }
        conn.end();
        callback(null, result);
        return;
    });
}
dbinteraction.deleteGclass = function(code, callback) {
    var query = 'DELETE FROM goodsclass WHERE gclasscode=' + code + ';';
    var result = false;
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("删除出错：" + err);
            err = "删除出错！";
            callback(err, null);
            return;
        }
        result = code;
        conn.end();
        callback(null, result);
        return;
    });
}
dbinteraction.pushGoods = function(msg, callback) {
    var query = 'INSERT INTO goods(gclasscode,gname,gdescription,price,img,path)VALUE';
    query += '(' + msg.code + ',"' + msg.name + '","' + msg.description + '",' + msg.price + ',"' + msg.filename + '","' + msg.path + '");';
    var result = false;
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("插入商品数据出错：" + err);
            err = "插入商品数据出错！";
            callback(err, null);
            return;
        }
        result = 200;
        conn.end();
        callback(null, result);
        return;
    });
}
dbinteraction.getGoods = function(code, callback) {
    var query = "",
        result = [];
    if (!code) {
        console.log("查询全部");
        query = 'SELECT * FROM goods;';
    } else {
        query = 'SELECT * FROM goods WHERE gclasscode=' + code + ';'
        console.log("查询部分1");
    }
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("查询商品数据出错：" + err);
            err = "查询商品数据出错！";
            callback(err, null);
            return;
        }
        if (rows.length > 0) {
            rows.forEach(function(item, i) {
                var goods = {
                    "name": item.gname,
                    "code": item.gcode,
                    "description": item.gdescription,
                    "price": item.price,
                    "imgurl": item.path + item.img

                };
                result.push(goods);
            });
        }
        callback(null, result);
        return;
    });
}
dbinteraction.getGood = function(code, callback) {
    var query = 'SELECT CONCAT(path,img) AS imgurl FROM goods WHERE gcode=' + code + ';';
    var result = false;
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("删除出错：" + err);
            err = "删除出错！";
            callback(err, null);
            return;
        }
        if (rows.length == 1) {
            result = rows[0].imgurl;
        }
        conn.end();
        callback(null, result);
        return;
    });
}
dbinteraction.deleteGoods = function(code, callback) {
    var query = 'DELETE FROM goods WHERE gcode=' + code + ';';
    var result = false;
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("删除出错：" + err);
            err = "删除出错！";
            callback(err, null);
            return;
        }
        result = code;
        conn.end();
        callback(null, result);
        return;
    });
}
dbinteraction.getGoodsKey = function(key, callback) {
    var query = 'SELECT gcode,gname,gdescription,price,CONCAT(path,img) AS imgurl FROM goods WHERE gname ';
    query += 'LIKE "%' + key + '%" OR gdescription LIKE "%' + key + '%";';
    var result = [];
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("查询商品数据出错：" + err);
            err = "查询商品数据出错！";
            callback(err, null);
            return;
        }
        if (rows.length > 0) {
            rows.forEach(function(item, i) {
                var goods = {
                    "name": item.gname,
                    "code": item.gcode,
                    "description": item.gdescription,
                    "price": item.price,
                    "imgurl": item.imgurl

                };
                result.push(goods);
            });
        }
        callback(null, result);
        return;
    });
}
dbinteraction.getMenu = function(use, callback) {
    var query = 'SELECT * FROM CMenu ORDER BY mcode DESC;';;
    var result = [];
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("查询一级文化块出错：" + err);
            err = "查询一级文化块出错！";
            callback(err, null);
            return;
        }
        if (rows.length > 0) {
            var len = rows.length;
            (function pushResult(i) {
                var item = rows[i];
                var temp = {
                    "code": item.mcode,
                    "name": item.cname,
                    "description": item.description
                };
                if (use) {
                    query = 'SELECT  CONCAT(path,img) AS imgurl FROM ctmenu WHERE mmcode=' + item.mcode + ';';
                    conn.query(query, function(err, rows, fields) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        var rlen = rows.length;
                        if (rlen > 0) {
                            var rone = rows[Math.floor(Math.random() * rows.length)];
                            temp["imgurl"] = rone.imgurl;
                            result.push(temp);
                        }
                        if (++i >= len) {
                            conn.end();
                            callback(null, result);
                            return;
                        }
                        pushResult(i);
                    });
                } else {
                    result.push(temp);
                    if (++i >= len) {
                        conn.end();
                        callback(null, result);
                        return;
                    }
                    pushResult(i);
                }
            })(0);
        }
    });
}
dbinteraction.pushMenu = function(name, description, callback) {
    var query = 'INSERT INTO CMenu(cname,description)VALUE("' + name + '","' + description + '");';
    var result = "";
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("插入一级文化块出错：" + err);
            err = "插入一级文化块出错！";
            callback(err, null);
            return;
        }
        query = 'SELECT * FROM CMenu WHERE cname="' + name + '";';
        conn.query(query, function(err, rows, fields) {
            if (err) {
                console.log("查询一级文化块code出错：" + err);
                err = "查询一级文化块code出错！";
                callback(err, null);
                return;
            }
            result = rows[rows.length - 1].mcode;
            conn.end();
            callback(null, result);
            return;
        })
    });
}
dbinteraction.deleteMenu = function(code, callback) {
    var query = 'DELETE FROM CMenu WHERE mcode=' + code + ';';
    var result = "";
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("删除一级文化块出错：" + err);
            err = "删除一级文化块出错！";
            callback(err, null);
            return;
        }
        result = code;
        callback(null, result);
        return;
    });
}
dbinteraction.getSMenu = function(code, use, callback) {
    var query = 'SELECT * FROM csmenu WHERE mcode=' + code + ' ORDER BY cod DESC;';
    var result = [];
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("查询二级级文化块出错：" + err);
            err = "查询二级级文化块出错！";
            callback(err, null);
            return;
        }
        if (rows.length > 0) {
            var rowsLen = rows.length;
            (function pushResult(i) {
                var item = rows[i],
                    cod = item.cod;
                var temp = {
                    "code": cod,
                    "name": item.cname,
                    "description": item.description
                };
                if (use) {
                    query = 'SELECT  CONCAT(path,img) AS imgurl FROM ctmenu WHERE mcode=' + cod + ';';
                    conn.query(query, function(err, rows, fields) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        var rlen = rows.length;
                        if (rlen > 0) {
                            var rone = rows[Math.floor(Math.random() * rlen)];
                            temp["imgurl"] = rone.imgurl;
                            result.push(temp);
                        }
                        if (++i < rowsLen) {
                            pushResult(i);
                        } else {
                            conn.end();
                            callback(null, result);
                            return;
                        }
                    });
                } else {
                    result.push(temp);
                    if (++i < rowsLen) {
                        pushResult(i);
                    } else {
                        conn.end();
                        callback(null, result);
                        return;
                    }
                }
            })(0);

        } else {
            callback(null, result);
            return;
        }
    });
}
dbinteraction.pushSMenu = function(mcode, name, description, callback) {
    var query = 'INSERT INTO csmenu(mcode,cname,description)VALUE(' + mcode + ',"' + name + '","' + description + '");';
    var result = "";
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("插入二级级文化块出错：" + err);
            err = "插入二级级文化块出错！";
            callback(err, null);
            return;
        }
        result = 200;
        callback(null, result);
        return;
    });
}
dbinteraction.deleteSMenu = function(code, callback) {
    var query = 'DELETE FROM csmenu WHERE cod=' + code + ';';
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("删除一级文化块出错：" + err);
            err = "删除一级文化块出错！";
            callback(err, null);
            return;
        }
        callback(null, "Ye");
        return;
    });
}
dbinteraction.getTMenu = function(code, callback) {
    var query = 'SELECT * FROM ctmenu WHERE mcode=' + code + ' ORDER BY cod DESC;';
    var result = [];
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("插叙三级级文化块出错：" + err);
            err = "插叙三级级文化块出错！";
            conn.end();
            callback(err, null);
            return;
        }
        if (rows.length > 0) {
            rows.forEach(function(item, i) {
                var temp = {
                    "code": item.cod,
                    "name": item.cname,
                    "description": item.description,
                    "imgurl": item.path + item.img
                }
                result.push(temp);
            })
        }
        conn.end();
        callback(null, result);
        return;
    });
};
dbinteraction.getTMenuOne = function(code, callback) {
    var query = 'SELECT CONCAT(path,img) AS imgurl FROM ctmenu WHERE cod=' + code + ';';
    var result = false;
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("插查询imgurl出错：" + err);
            err = "查询imgurl出错！";
            callback(err, null);
            return;
        }
        if (rows.length == 1) {
            result = rows[0].imgurl;

        }
        conn.end();
        callback(null, result);
        return;
    });
}
dbinteraction.pushTMenu = function(msg, callback) {
    var query = 'INSERT INTO ctmenu(mmcode,mcode,cname,description,img,path)VALUE';
    query += '(' + msg.mmcode + ',' + msg.mcode + ',"' + msg.name + '","' + msg.description + '","' + msg.filename + '","' + msg.path + '");'
    var result = "";
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("插入一级文化块出错：" + err);
            err = "插入一级文化块出错！";
            callback(err, null);
            return;
        }
        result = 200;
        console.log("目录图片推送成功！");
        callback(null, result);
        conn.end();
        return;
    });
}
dbinteraction.deleteTMenu = function(code, callback) {
    var query = 'DELETE FROM ctmenu WHERE cod=' + code+';';
    conn = mysql.createConnection(sqlconfig);
    conn.connect();
    conn.query(query, function(err, rows, fields) {
        if (err) {
            console.log("删除一级文化块出错：" + err);
            err = "删除一级文化块出错！";
            callback(err, null);
            return;
        }
        conn.end();
        callback(null, code);
        return;
    });
}
module.exports = dbinteraction;
