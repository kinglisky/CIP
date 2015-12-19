var express = require('express');
var dbinit=require('./dbctrl/dbinit');
/*好像是对路由路径进行处理用的*/
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var listenport = process.env.VCAP_APP_PORT || 3000;
dbinit.init();
app.listen(listenport);

// 设置默认的模板引擎
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
/*使用ejs模板，但后缀使用html*/
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
/*静态文件托管目录，所有的静态请求都路由到public目录下*/
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/home', routes);
app.use('/cloud', routes);
app.use('/culture', routes);
app.use('/login', routes);
app.use('/sigup', routes);
app.use('/out', routes);
app.use('/admin', routes);
app.use('/users',users);
app.use('/gcmenu',routes);
app.use('/goods',routes);
app.use('/shop',routes);
app.use('/cmenu',routes);
app.use('/scmenu',routes);
app.use('/tcmenu',routes);

// 404错误处理
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*开发者调试用的*/
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;
console.log("服务器运行在" + listenport + "端口!");
