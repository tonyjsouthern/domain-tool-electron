function getCnameSingular(scope, arg) {
	var domain = arg;

	return scope.dns.resolveCname(domain)
		.then((response) => {
			console.log(response)
			return response;
		})
		.catch(function (error) {
			console.log(error.code)
			return error.code;
		})

}

module.exports = getCnameSingular;
