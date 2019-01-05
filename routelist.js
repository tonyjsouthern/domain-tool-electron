module.exports = {
	getDkim: require("./handlers/dkim/dkim.js"),
	getSpf: require("./handlers/dkim/spf.js"),
	getCname: require("./handlers/cname.js"),
	getCnameSingular: require("./handlers/cnamesingular.js"),
	checkTracking: require("./handlers/checkTracking.js"),
	whois: require("./handlers/whois.js")
};
