import { inject } from 'aurelia-framework';
import { BackendService } from './src/services/service.js';

@inject(BackendService)
export class Dkim {

    constructor(BackendService) {
        this.BackendService = BackendService;
        this.domain;
        this.spfs;
        this.dkim;
        this.showResults = false;
        this.dkimLongTF = false;
        this.dkimShortTF = false;
        this.tfSpf = false;
        this.spfMessage;
    }

    compareSpfDkim(domain) {
        var adjUrl;
        this.spfMessage = "";

        if (this.domain.indexOf("https") != -1) {
            adjUrl = this.domain.slice(8);
        } else if (this.domain.indexOf("http") != -1) {
            adjUrl = this.domain.slice(7);
        } else {
            adjUrl = this.domain;
        }

        this.dkim = this.BackendService.checkDomainDkim(adjUrl)

        if (this.dkim.dkimLongTF == true) {
            this.dkimLongTF = this.dkim.dkimLongTF;
        } else {
            this.dkimLongTF = false;
        }

        if (this.dkim.dkimShortTF == true) {
            this.dkimShortTF = this.dkim.dkimShortTF;
        } else {
            this.dkimShortTF = false;
        }

        this.spfs = this.BackendService.checkDomainSpf(adjUrl)
        console.log(this.spfs)
        this.showResults = true;

        if (this.spfs >= 2) {
            this.tfSpf = false;
            this.spfMessage = "Multiple SPF records were found. All SPF records should be combined into a singular record.";
        } else {
            this.tfSpf = this.spfs[0].value;
        }

    }

}
