export class ServerConverter {

	constructor() {
    this.compiledString = {
      customerID: "",
      customerName: "",
      domainName: "",
      machineName: "",
      sqlServer: "",
      database: ""
    }
	}

  convertString(string) {
    console.log(string)
    var stringArray = string.split(':')
    this.compiledString.customerID    = this.trimStrings(13, stringArray[1])
    this.compiledString.customerName  = this.trimStrings(11, stringArray[2])
    this.compiledString.domainName    = this.trimStrings(12, stringArray[3])
    this.compiledString.machineName   = this.trimStrings(10, stringArray[4])
    this.compiledString.sqlServer     = this.trimStrings(9, stringArray[5])
    this.compiledString.database      = this.trimStringForDatabase(4, stringArray[6])
    return this.compiledString;
  }

  trimStrings(int, string) {
    var reducedString = string.substring(0, string.length - int)
    var trimmedString = reducedString.trim()
    return trimmedString;
  }

  trimStringForDatabase(int, string) {
    if (string.includes("CRM")){
      return string.substring(0, string.length - int)
    }else{
      return string.trim();
    }
  }

}
