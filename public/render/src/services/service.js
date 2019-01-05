
export class BackendService {

	constructor() {
	}

	checkDomainTracking(domain) {
		return window.ipc.sendSync('check-tracking', domain)
	}

	checkDomainDkim(domain) {
		return window.ipc.sendSync('dkim', domain)
	}

	checkDomainSpf(domain) {
		return window.ipc.sendSync('spf', domain)
	}

	checkCname(domain) {
		return window.ipc.sendSync('cname', domain);
	}

	checkCnameSingular(domain) {
		return window.ipc.sendSync('cname-singular', domain)
	}

	checkWhois(domain) {
		return window.ipc.sendSync('whois', domain);
	}

}
