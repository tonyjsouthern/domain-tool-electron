function getDkim(scope, arg) {
	var domain = "msgapp._domainkey." + arg;
	var domainShort = "_domainkey." + arg;

	var results = {
		dkimLong: "",
		dkimShort: "",
		messageLong: "",
		messageShort: "",
		dkimLongTF: "",
		dkimShortTF: ""
	}


async function resolveDkims() {
	await resolveDkimLong(domain);
	await resolveDkimShort(domainShort)
	await console.log(results)
	return results
}

function resolveDkimLong (domain) {
	return scope.dns.resolveTxt(domain)
	.then( (response) => {
		console.log("test: " + response[0][0])
		if (response[0][0] == scope.dkim.dkimLong) {
			console.log("matches")
			results.dkimLong = response[0][0];
			results.messageLong = "It Matches!";
			results.dkimLongTF = true;
		} else {
			console.log("doesnt match")
				results.dkimLong = response[0][0];
				results.messageLong = "It doesn't match!";
				results.dkimLongTF = false;
			};
		})
	.catch((error)=> {
		console.log(error)
			results.dkimLong = "";
			results.messageLong = "Error encountered loading DKIM (DKIM is either configured incorrectly or does not exist.)"
			results.dkimLongTF = false;
	})
}

function resolveDkimShort (domain) {
	return scope.dns.resolveTxt(domain)
	.then( (response) => {
		console.log(response[0][0])
		if (response[0][0] == scope.dkim.dkimShort) {
			results.dkimShort = response[0][0];
			results.messageShort = "It Matches!"
			results.dkimShortTF = true;
		} else {
				results.dkimShort = response[0][0];
				results.messageShort = "It doesn't match!";
				results.dkimShortTF = false;
			};
		})
	.catch((error)=> {
		console.log(error)
			results.dkimShort = "";
			results.messageShort = "Error encountered loading DKIM (DKIM is either configured incorrectly or does not exist.)"
			results.dkimShortTF = false;
	})
}

return resolveDkims();


}

module.exports = getDkim;
