var express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    dbctrl = require('../dbctrl/dbctrl.js'),
    dbinteraction = require('../dbctrl/dbinteraction.js'),
    filectrl = require('../filectrl/filectrl.js');
var formidable = require('formidable');
var app = express();
app.use(cookieParser());
app.use(session({
    secret: '710579',
    resave: false,
    saveUninitialized: true,
}));
/*用户主页*/
app.get('/', function(req, res, next) {
    var user = {
        "username": false
    };
    if (typeof req.session.user != "undefined") {
        user = {
            "username": req.session.user.name,
            "identity": req.session.user.identity
        };
    }
    res.render('index', user);
});
/*用户登录*/
app.route('/login')
    .get(function(req, res) {
        console.log("登录界面!");
        res.render('login', {
            "loginerr": null
        });
    })
    .post(function(req, res) {
        dbctrl.login(req.body.username, req.body.password, function(result) {
            if (result) {
                var identity = result.useridentity;
                var user = req.session.user = {
                    "name": result.username,
                    "id": result.userid,
                    "identity": identity
                };
                req.session.user = user;
                res.cookie('nantime', JSON.stringify(user), {
                    expires: new Date(Date.now() + 900000)
                });
                if (identity == "admin") {
                    res.redirect('/admin');
                } else {
                    res.redirect('/home');
                }
            } else {
                res.render('login', {
                    "loginerr": "账号或密码有错请核对后再进行登录！"
                });
            }
        });


    });
/*用户注册*/
app.route('/sigup')
    .get(function(req, res) {
        res.render('sigup', {
            "siguperr": null
        });
    })
    .post(function(req, res) {
        dbctrl.sigup(req.body.username, req.body.password, req.body.repassword, function(result) {
            if (result == 200) {
                console.log("跳转到登录!");
                res.redirect('/login');
                return;
            } else {
                res.render('sigup', {
                    "siguperr": result
                });
                return;
            }
        });
    });
/*登录跳转主页*/
app.get('/home', function(req, res) {
    if (req.session.user) {
        console.log("回话名称：" + req.session.user.name);
        res.render('index', {
            "username": req.session.user.name,
            "identity": req.session.user.identity
        });
    } else {
        res.redirect('/');
    }
});
app.get('/cloud', function(req, res) {
    var msg = {
        "username": false
    };
    if (req.session.user) {
        console.log("回话名称：" + req.session.user.name);
        msg = {
            "username": req.session.user.name,
            "identity": req.session.user.identity
        };
    }
    res.render('cloud', msg);
});
app.get('/culture', function(req, res) {
    var msg = {
        "username": false
    };
    if (req.session.user) {
        console.log("回话名称：" + req.session.user.name);
        msg = {
            "username": req.session.user.name,
            "identity": req.session.user.identity
        };
    }
    res.render('cultureshow', msg);
});
/*用户登出，释放连接*/
app.get('/out', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log("释放session出错：" + err);
            return;
        }
        res.redirect('/');
    });
});
app.get('/admin', function(req, res) {
    if (typeof req.session.user != "undefined") {
        var adminData = req.session.user;
        if (adminData.identity == "admin") {
            var go = req.query.go,
                routes = {
                    "1": "adminCul",
                    "2": "adminGoods"
                },
                goto = "";
            goto = routes[go] || routes["1"];
            res.render(goto, adminData);
            return
        }
    }
    res.redirect('/');
    return;
});
app.get('/shop', function(req, res) {
    var key = req.query.key || "";
    var msg = {
        "username": false,
        "key": key
    };
    if (typeof req.session.user != "undefined") {
        msg = {
            "username": req.session.user.name,
            "identity": req.session.user.identity,
            "key": key
        };
    }
    res.render('shopping', msg);
});
app.route('/gcmenu')
    .get(function(req, res) {
        var code = req.query.code,
            dlt = req.query.delete;
        console.log(code + "--" + dlt);
        if (code && dlt) {
            dbinteraction.deleteGclass(code, function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                var path = "./public/data/goods/" + result;
                filectrl.deletePath(path, function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.send(result);
                });
            });
        } else {
            dbinteraction.rGoodClassMenu(function(menus) {
                console.log(menus);
                res.send(menus);
            });
        }
    })
    .post(function(req, res) {
        if (!!!req.body.gclassname) {
            res.send("亲不能为空哦！");
            return;
        }
        dbinteraction.addGclass(req.body.gclassname, function(result) {
            console.log("返回的数据为：" + result);
            if ("Ye" == result) {
                dbinteraction.getGcode(req.body.gclassname, function(err, mark) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    var path = "./public/data/goods/" + mark;
                    filectrl.markdir(path, function(err, flag) {
                        if (err) {
                            console.log(err);
                            result = "创建文件目录出错!";
                            dbinteraction.deleteGclass(mark, function(err, rlt) {
                                if (err) {
                                    console.log(err);
                                    result = "删除结果出错" + rlt;
                                    return;
                                }
                                res.send(result);
                                return;
                            });
                        }
                        res.send(result);
                        return;
                    });
                });
            } else {
                res.send(result);
                return;
            }
        });
    });
app.route('/goods')
    .get(function(req, res) {
        var code = req.query.code || false;
        var key = req.query.key || false;
        var dlt = req.query.delete || false;
        console.log("查询code：" + code + "-key:" + key + "-delete:" + dlt);
        if (code && dlt) {
            dbinteraction.getGood(code, function(err, imgurl) {
                console.log('第一级')
                if (err) {
                    console.log(err);
                    return;
                }
                if (imgurl) {
                    console.log("第二级");
                    dbinteraction.deleteGoods(code, function(err, result) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        var path = './public/' + imgurl;
                        filectrl.deletePath(path, function(err, result) {
                            console.log("第三级");
                            if (err) {
                                console.log(err);
                                return;
                            }
                            res.send(result);
                            return;
                        });
                    });
                } else {
                    console.log("图片不存在！");
                    res.send("图片不存在！");
                    return;
                }
            });
        } else {
            if (key) {
                dbinteraction.getGoodsKey(key, function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    };
                    res.send(result);
                });
            } else {
                dbinteraction.getGoods(code, function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    };
                    res.send(result);
                });
            }
        }
    })
    .post(function(req, res) {
        filectrl.savePicture(req, res, function(err, result) {
            if (err) {
                console.log(err);
                res.send(400);
                return;
            }
            dbinteraction.pushGoods(result, function(err, mark) {
                if (err) {
                    console.log(err);
                    res.send(400);
                    return;
                }
                console.log("商品数据储存成功!");
                res.send(200);
                return;
            });
        });
    });
app.route('/cmenu')
    .get(function(req, res) {
        var use = req.query.use || false;
        var code = req.query.code || false;
        var dlt = req.query.delete || false;
        console.log("use:" + use + "-code:" + code + "-delete:" + dlt);
        if (code && dlt) {
            dbinteraction.deleteMenu(code, function(err, mark) {
                if (err) {
                    res.send(err);
                    return;
                }
                var path = "./public/data/cmenu/" + mark;
                filectrl.deletePath(path, function(err, result) {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    res.send(result);
                    return;
                });
            });
        } else {
            dbinteraction.getMenu(use, function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.send(result);
            });
        }
    })
    .post(function(req, res) {
        console.log("提交到服务器咯!");
        var name = req.body.name,
            description = req.body.description;
        if (!!name && !!description) {
            console.log('到这了');
            dbinteraction.pushMenu(name, description, function(err, result) {
                if (err) {
                    res.send(err);
                    return;
                };
                var path = "./public/data/cmenu/" + result;
                filectrl.markdir(path, function(err, flag) {
                    if (err) {
                        console.log(err);
                        dbinteraction.deleteMenu(result, function(err, mark) {
                            if (err) {
                                res.send(err);
                                return;
                            }
                            console.log("删除结果：" + mark);
                        });
                    }
                    res.send("Ye");
                    return;
                });
            });
        } else {
            res.send("信息填写不完整！");
            return;
        }
    });
app.route('/scmenu')
    .get(function(req, res) {
        var code = req.query.code;
        var use = req.query.use || false;
        var del = req.query.delete || false;
        if (code && del) {
            dbinteraction.deleteSMenu(code, function(err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.send(result);
            })
        } else {
            if (!!code) {
                dbinteraction.getSMenu(code, use, function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log(result);
                    res.send(result);
                });
            }
        }
    })
    .post(function(req, res) {
        console.log("提交到服务器咯!");
        var mocde = req.body.mcode,
            name = req.body.name,
            description = req.body.description;
        if (!!name && !!description && !!mocde) {
            console.log('到这了');
            dbinteraction.pushSMenu(mocde, name, description, function(err, result) {
                if (err) {
                    res.send(err);
                    return;
                };
                res.send("Ye");
                return;
            });
        } else {
            res.send("信息填写不完整！");
            return;
        }
    });
app.route('/tcmenu')
    .get(function(req, res) {
        var code = req.query.code;
        var dlt = req.query.delete || false;
        if (code) {
            if (code&&dlt) {
                console.log("1.删除图片触发。。。。");
                dbinteraction.getTMenuOne(code, function(err, imgurl) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    if (imgurl) {
                        dbinteraction.deleteTMenu(code, function(err, rcode) {
                            if (err) {
                                console.log(err);
                                return;
                            }
                            var path = './public/' + imgurl;
                            console.log("2.删除图片路径：" + path);
                            filectrl.deletePath(path, function(err, result) {
                                if (err) {
                                    console.log(err);
                                    return;
                                }
                                console.log("3.删除结果："+result);
                                res.send(result);
                                return;
                            });
                        });
                    }else{
                        console.log("4.图片不存在："+imgurl);
                        res.send("No");
                        return;
                    }
                });
            } else {
                dbinteraction.getTMenu(code, function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res.send(result);
                    return;
                });
            }
        } else {
            console.log("code没传递过来！");
        }
    })
    .post(function(req, res) {
        console.log("提交到服务器咯!");
        filectrl.saveMenuPicture(req, res, function(err, result) {
            if (err) {
                console.log(err);
                return;
            }
            dbinteraction.pushTMenu(result, function(err, flag) {
                if (err) {
                    console.log(err);
                    return;
                }
                res.send(200);
                return;
            });
        });
    });
module.exports = app;
