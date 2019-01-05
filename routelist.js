module.exports = {
	getDkim: require("./handlers/dkim/dkim.js"),
	getSpf: require("./handlers/dkim/spf.js"),
	getCname: require("./handlers/cname.js"),
	getCnameSingular: require("./handlers/cnamesingular.js"),
	checkTracking: require("./handlers/checkTracking.js"),
	query: require("./handlers/query.js"),
	connect: require("./handlers/connect.js"),
	whois: require("./handlers/whois.js"),
	customer: require('./handlers/customer.js'),
	sslCheck: require('./handlers/ssl/sslcheck.js'),
	certDecoder: require('./handlers/ssl/certdecoder.js')
};
