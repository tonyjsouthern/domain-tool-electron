function getSpf(scope, arg) {
	var domain = arg;
	var vRecord = [];

	return scope.dns.resolveTxt(domain)
	.then ((response) => {
				for (var i = 0; i < response.length; i++) {
					if (response[i][0].indexOf("v=spf1") != -1) {
						if (response[i][0].indexOf("auth.msgapp.com") != -1) {
							vRecord.push({
								results: response[i][0],
								message: "It Matches!",
								value: true
							});
						} else {
							vRecord.push({
								results: response[i][0],
								message: "It Doesn't Match!",
								value: false
							});
						}
					}
				}
			return (vRecord);
	})
	.catch((error) => {
		vRecord.push({
			results: "",
			message: "Error encountered loading spf"
		});
		return vRecord
	})

}

module.exports = getSpf;
