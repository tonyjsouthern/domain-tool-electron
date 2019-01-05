function getCname(scope, arg) {
	var domain = arg;
	var query = 'select hostedlink, cookieserver, shareserver, customer_id, customername,domainname  from customer where domainname like \'%' + domain + '%\' and processactive = 1'

	var config = {
		host: scope.secret.host,
		port: scope.secret.port,
		dialect: scope.secret.dialect,
		userName: scope.secret.username,
		password: scope.secret.password,
		database: scope.secret.database
	};

	var cnameResults = {
		landingPages: {
			cname: "",
			results: ""
		},
		cookieServer: {
			cname: "",
			results: ""
		},
		campaignLinks: {
			cname: "",
			results: ""
		},
		customerName: "",
		customerId: "",
		domainName: ""
	}

	async function getCnames() {
		var connection = await new scope.sql(config.database, config.userName, config.password, config);
		await connection.query(query).spread(function (results) {
			if (results.length == 0) {
				var errorMsg = "Please enter a valid Salesfusion domain"
				return errorMsg
			} else {
				var cnames = results[0]
				cnameResults.landingPages.cname = cnames.hostedlink;
				cnameResults.cookieServer.cname = cnames.cookieserver;
				cnameResults.campaignLinks.cname = cnames.shareserver;
				cnameResults.customerName = cnames.customername;
				cnameResults.customerId = cnames.customer_id;
				cnameResults.domainName = cnames.domainname;
			}
		})
		if (cnameResults.landingPages.cname != "") {
			await setLandingPage(cnameResults.landingPages.cname)
			await setCookieServer(cnameResults.cookieServer.cname)
			await setShareServer(cnameResults.campaignLinks.cname)
			await connection.close();
			await console.log("results" + cnameResults)
			return cnameResults
		} else {
			await connection.close();
			var errorMsg = "Please enter a valid Salesfusion domain"
			return errorMsg
		}
	}

	function setLandingPage(domain) {
		return scope.dns.resolveCname(domain)
			.then((response) => {
				cnameResults.landingPages.results = response[0]
			})
			.catch(function (error) {
				cnameResults.landingPages.results = error.code;
			})
	}

	function setCookieServer(domain) {
		return scope.dns.resolveCname(domain)
			.then((response) => {
				cnameResults.cookieServer.results = response[0]
			})
			.catch(function (error) {
				cnameResults.cookieServer.results = error.code;
			})
	}

	function setShareServer(domain) {
		return scope.dns.resolveCname(domain)
			.then((response) => {
				cnameResults.campaignLinks.results = response[0]
			})
			.catch(function (error) {
				cnameResults.campaignLinks.results = error.code;
			})
	}

	return getCnames();

}
module.exports = getCname;
