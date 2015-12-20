var coding_services = JSON.parse(process.env.VCAP_SERVICES);
var coding_application = JSON.parse(process.env.VCAP_APPLICATION);
/*var cfg = {
	"host": "127.0.0.1",
	"user": "root",
	"password": "710579",
	"database": "cps",
	"port": 3306
}*/
var cfg = {
	"host": coding_services.mysql[0].credentials.hostname,
	"user": coding_services.mysql[0].credentials.username,
	"password": coding_services.mysql[0].credentials.password,
	"database": coding_services.mysql[0].credentials.name,
	"port": 3306
}
module.exports = cfg;
