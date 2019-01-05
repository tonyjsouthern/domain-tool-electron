import { inject } from 'aurelia-framework';
import { BackendService } from './src/services/service.js';

@inject(BackendService)
export class Cname {

	constructor(BackendService) {
		this.BackendService = BackendService;

		this.cname;
		this.cnameSingular;

		this.showSfChecker = true;
		this.showSinglularChecker = false;

		this.showResults = false;
		this.showError = false;
		this.results;
		this.resultsSingular;
	}

	checkCname() {
		this.results = this.BackendService.checkCname(this.cname);
			if (this.results == 'Please enter a valid Salesfusion domain') {
				this.showResults = false;
				this.showError = true;
			} else if (this.cname == undefined) {
				this.results = 'Please enter a valid Salesfusion domain';
				this.showResults = false;
				this.showError = true;
			} else {
				this.showResults = true;
				this.showError = false;
			}

	}

	checkCnameSingular() {
		this.resultsSingular = this.BackendService.checkCnameSingular(this.cnameSingular)
		console.log(this.resultsSingular)
	}

	toggleSfChecker() {
		if (this.showSfChecker == false) {
			this.showSfChecker = true;
		} else {
			this.showSfChecker = false;
		}
	}

	toggleSingularChecker() {
		if (this.showSinglularChecker == false) {
			this.showSinglularChecker = true;
		} else {
			this.showSinglularChecker = false;
		}
	}

}
