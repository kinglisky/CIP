var coding_services = JSON.parse(process.env.VCAP_SERVICES);
var coding_application = JSON.parse(process.env.VCAP_APPLICATION),
	serverConfig = {
		"host": coding_services.mysql[0].credentials.hostname,
		"user": coding_services.mysql[0].credentials.username,
		"password": coding_services.mysql[0].credentials.password,
		"database": coding_services.mysql[0].credentials.name,
		"port": 3306
	}
var cfg = {
	/*config: {
		"host": "127.0.0.1",
		"user": "root",
		"password": "710579",
		"port": 3306
	},*/
	config:serverConfig,
	createDatabase: "CREATE DATABASE IF NOT EXISTS " + serverConfig.database,
	useDatabase: "USE " + serverConfig.database,
	createCMenu: "CREATE TABLE IF NOT EXISTS cmenu (" +
		"mcode int(8) NOT NULL AUTO_INCREMENT," +
		"cname varchar(40) NOT NULL," +
		"description text NOT NULL," +
		"PRIMARY KEY (mcode)," +
		"KEY index_mc (mcode)" +
		") ENGINE=InnoDB DEFAULT CHARSET=utf8",
	createCSMenu: "CREATE TABLE IF NOT EXISTS csmenu (" +
		"mcode int(8) NOT NULL," +
		"cod int(8) NOT NULL AUTO_INCREMENT," +
		"cname varchar(40) NOT NULL," +
		"description text NOT NULL," +
		"PRIMARY KEY (cod)," +
		"KEY index_cod (cod)," +
		"KEY fk_mc (mcode)," +
		"CONSTRAINT fk_mc FOREIGN KEY (mcode) REFERENCES cmenu (mcode) ON DELETE CASCADE ON UPDATE CASCADE" +
		") ENGINE=InnoDB DEFAULT CHARSET=utf8",
	createCTMenu: "CREATE TABLE IF NOT EXISTS ctmenu (" +
		"mcode int(8) NOT NULL," +
		"cod int(8) NOT NULL AUTO_INCREMENT," +
		"cname varchar(40) NOT NULL," +
		"description text NOT NULL," +
		"img varchar(40) NOT NULL," +
		"path varchar(40) NOT NULL," +
		"mmcode int(8) NOT NULL," +
		"PRIMARY KEY (cod)," +
		"KEY index_tcod (cod)," +
		"KEY fk_tmc (mcode)," +
		"KEY fk_mmc (mmcode)," +
		"CONSTRAINT fk_mmc FOREIGN KEY (mmcode) REFERENCES cmenu (mcode) ON DELETE CASCADE ON UPDATE CASCADE," +
		"CONSTRAINT fk_tmc FOREIGN KEY (mcode) REFERENCES csmenu (cod) ON DELETE CASCADE ON UPDATE CASCADE" +
		") ENGINE=InnoDB DEFAULT CHARSET=utf8",
	createGoods: "CREATE TABLE IF NOT EXISTS goods (" +
		"gclasscode int(8) NOT NULL," +
		"gcode int(8) NOT NULL AUTO_INCREMENT," +
		"gname varchar(40) NOT NULL," +
		"gdescription text NOT NULL," +
		"price int(5) NOT NULL," +
		"img varchar(40) NOT NULL," +
		"path varchar(40) NOT NULL," +
		"PRIMARY KEY (gcode)," +
		"KEY gccode (gclasscode)," +
		"CONSTRAINT gccode FOREIGN KEY (gclasscode) REFERENCES goodsclass (gclasscode) ON DELETE CASCADE ON UPDATE CASCADE" +
		") ENGINE=InnoDB DEFAULT CHARSET=utf8",
	createGoodsclass: "CREATE TABLE IF NOT EXISTS goodsclass (" +
		"gclasscode int(8) NOT NULL AUTO_INCREMENT," +
		"gclassname varchar(20) NOT NULL," +
		"PRIMARY KEY (gclasscode)," +
		"UNIQUE KEY gclassname (gclassname)," +
		"KEY gcindex (gclasscode)" +
		") ENGINE=InnoDB DEFAULT CHARSET=utf8",
	createUsers: "CREATE TABLE IF NOT EXISTS users (" +
		"userid int(8) NOT NULL AUTO_INCREMENT," +
		"username varchar(20) NOT NULL," +
		"userpassword varchar(40) NOT NULL," +
		"useridentity enum('user','admin') NOT NULL," +
		"PRIMARY KEY (userid)," +
		"UNIQUE KEY username (username)," +
		"KEY indexuser_id (userid)" +
		") ENGINE=InnoDB DEFAULT CHARSET=utf8",
	deleteAdmin: "DELETE FROM users WHERE username='admin'",
	insertAdmin: "insert  into users(userid,username,userpassword,useridentity)" +
		"values (24,'admin','21232f297a57a5a743894a0e4a801fc3','admin')"

}
module.exports = cfg;
