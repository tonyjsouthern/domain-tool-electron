
import {
  inject
} from 'aurelia-framework';
import {
  BackendService
} from './src/services/service.js';


@inject(BackendService)
export class Index {

  constructor (BackendService) {
    this.BackendService = BackendService;
    this.domain;
    this.tfObject;
    this.showResults = false;
    this.showError = false;
  }

  activate(){

  }

  submitController () {

    if (this.domain.indexOf("https") != -1) {
      var adjUrl = "http" + this.domain.slice(5)
      console.log(this.tfObject)
      this.tfObject = this.BackendService.checkDomainTracking(adjUrl)
    } else if (this.domain.indexOf("http") != -1) {
      this.tfObject = this.BackendService.checkDomainTracking(adjUrl)
      this.showResults = true;
      this.showError = false;
    } else if (this.domain.indexOf(".com") == -1) {
      console.log("test")
      this.showError = true;
      this.showResults = false;
    } else {
      var adjUrl = "http://" + this.domain
      this.tfObject = this.BackendService.checkDomainTracking(adjUrl)
      this.showResults = true;
      this.showError = false;

    }
  }


}
