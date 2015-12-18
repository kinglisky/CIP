var express = require('express'),
    dbinteraction = require('../dbctrl/dbinteraction.js');
var app = express();
app.route('/gcmenu')
    .get(function(req, res) {
        console.log('查找么怒');
        dbinteraction.rGoodClassMenu(function(menus) {
            console.log(menus);
            res.send(menus);
        });
    })
    .post(function(req, res) {
        console.log('have post');
});
module.exports = app;
