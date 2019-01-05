function checkTracking(scope, arg) {
	var domain = arg

	var domainObject = {
		sf: false,
		marketo: false,
		actOn: false,
		clickDimensions: false,
		pardot: false,
		google: false,
		hubspot: false,
		googleTag: false
	};

	return scope.axios.get(domain)
		.then(response => {
			var html = response.data;
			checkSF(html);
			checkHubspot(html);
			checkMarketo(html);
			CheckActon(html);
			checkClickDimensions(html);
			checkPardot(html);
			checkGoogle(html);
			checkGoogleTag(html);
		})
		.then(() => {
			return domainObject;
		})
		.catch((error) => {
			console.log(error)
			return error.code
		});

	function checkSF(html) {
		console.log("SF Check running...");
		if (html.indexOf("sf_config") != -1 || html.indexOf("frt(") != -1) {
			domainObject.sf = true;
		}
	}

	function checkHubspot(html) {
		console.log("Hubspot Check running...");
		if (html.indexOf("hs-scripts.com") != -1) {
			domainObject.hubspot = true;
		}
	}

	function checkMarketo(html) {
		console.log("Marketo check running...");
		if (html.indexOf('munchkin') != -1) {
			domainObject.marketo = true;
		}
	}

	// Check for Acton Tracking Script
	function CheckActon(html) {
		console.log("ActOn check running...");
		if (html.indexOf('acton') != -1) {
			domainObject.actOn = true;
		}
	}

	// Check for ClickDimensions Scripts
	function checkClickDimensions(html) {
		console.log("Click Dimensions check running...");
		if (html.indexOf('clickdimensions') != -1) {
			domainObject.clickDimensions = true;
		}
	}

	function checkPardot(html) {
		console.log("Pardot check running...");
		if (html.indexOf('pardot') != -1) {
			domainObject.pardot = true;
		}
	}

	function checkGoogle(html) {
		console.log("Google check running...");
		if (html.indexOf('GoogleAnalytics') != -1) {
			domainObject.google = true;
		}
	}

	function checkGoogleTag(html) {
		console.log("GoogleTag check running...");
		if (html.indexOf('googletag') != -1) {
			domainObject.googleTag = true;
		}
	}

}

module.exports = checkTracking;
