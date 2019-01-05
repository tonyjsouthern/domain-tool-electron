import { inject } from 'aurelia-framework';
import { BackendService } from './src/services/service.js';

@inject(BackendService)
export class WhoIs {

  constructor(BackendService) {
    this.BackendService = BackendService;
    this.domain;
    this.whoIsResults;
    this.showResults = false;

		this.showDomainInfo = true;
		this.showMxInfo = true;
		this.showRegisterInfo = false;
		this.showNameServerInfo = false;
  }

  runWhoIs() {
    this.whoIsResults = this.BackendService.checkWhois(this.domain)
		console.log(this.whoIsResults)
      this.showResults = true;
  }

	domainInfoToggle() {
		if (this.showDomainInfo == false){
			this.showDomainInfo = true;
		}else{
			this.showDomainInfo = false;
		}
	}

	mxInfoToggle() {
		if (this.showMxInfo == false){
			this.showMxInfo = true;
		}else{
			this.showMxInfo = false;
		}
	}

	registerInfoToggle() {
		if (this.showRegisterInfo == false){
			this.showRegisterInfo = true;
		}else{
			this.showRegisterInfo = false;
		}
	}

	nameServerInfoToggle() {
		if (this.showNameServerInfo == false){
			this.showNameServerInfo = true;
		}else{
			this.showNameServerInfo = false;
		}
	}

}
