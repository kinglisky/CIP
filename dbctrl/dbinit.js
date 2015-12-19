var mysql = require('mysql'),
	cfg = require('./createConfig'),
	dbctrl = null,
	creates = [{
		key: "createDatabase",
		msg: "建立数据库cps"
	}, {
		key: "useDatabase",
		msg: "使用数据库"
	}, {
		key: "createCMenu",
		msg: "建立一级目录"
	}, {
		key: "createCSMenu",
		msg: "建立二级目录"
	}, {
		key: "createCTMenu",
		msg: "建立三级目录"
	}, {
		key: "createGoodsclass",
		msg: "建立货物分类表"
	}, {
		key: "createGoods",
		msg: "建立货物表"
	}, {
		key: "createUsers",
		msg: "建立用户表"
	}, {
		key: "deleteAdmin",
		msg: "删除已有的管理员"
	}, {
		key: "insertAdmin",
		msg: "建立管理员身份"
	}],
	Qlen = creates.length;
dbctrl = {
	run: function (conn, index) {
		if (index === Qlen) {
			conn.end();
			return console.log('数据库初始化完成！！');
		}
		var item = creates[index],
			query = cfg[item.key]
		conn.query(query, function (err) {
			if (err) return console.log(item.key, item.msg + ' 出错！', err);
			console.log(item.key, item.msg + ' 成功');
			dbctrl.run(conn, ++index);
		});
	},
	init: function () {
		var index = 0;
		conn = mysql.createConnection(cfg.config);
		conn.connect();
		dbctrl.run(conn, index);

	}
}
module.exports = dbctrl;
