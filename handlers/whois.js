function whois (scope, arg) {
  var domain = arg;

  var completeDNS = {
    whoIs: "",
    mx: "",
    txt: "",
    ns: "",
    ptr: ""
  }

  return new Promise((resolve, reject) => {
     console.log("First Promise");
     var whoIsPromise = getWhoIs(domain);
     resolve(whoIsPromise);
  })
  .catch((error) => {
      console.log(error)
  })
   .then(() => {
     console.log("Second Promise");
     return getMx(domain);
  })
   .then(() => {
     console.log("Third Promise");
     return getTxt(domain);
   })
   .then(() => {
     console.log("Fourth Promise");
     return getNs(domain);
   })
   .then(() => {
     console.log("Fifth Promise")
     return getPtr(domain);
   })
   .then(() => {
     console.log("Sixth Promise")
     return completeDNS
   })

function getWhoIs(domain) {
  return scope.axios({
          method:'get',
          url: 'https://jsonwhoisapi.com/api/v1/whois?identifier=' + domain ,
          auth: {
              username: '584087300',
              password: 'nOa4CTLvF2ZAPbULgtDBtQ'
          }
      })
      .then((response) => {
          completeDNS.whoIs = response.data;
          console.log("whois")
      })
      .catch((error) => {
          return error
      });
    }

function getMx(domain) {
   return scope.dns.resolveMx(domain)
   .then((response) => {
      completeDNS.mx = response;
      console.log("MX success")
   })
   .catch(function(error) {
     var errorArray = []
     errorArray.push(error)
     completeDNS.mx = errorArray;
   })
}

function getTxt(domain) {
   return scope.dns.resolveTxt(domain)
   .then((response) => {
      completeDNS.txt = response;
      console.log(response)
   })
   .catch(function(error) {
     var errorArray = []
     errorArray.push(error)
     completeDNS.txt = errorArray;
     console.log("Txt error")
   })
}

function getNs(domain) {
   return scope.dns.resolveNs(domain)
   .then((response) => {
      completeDNS.ns = response;
      console.log("Ns success")
   })
   .catch(function(error) {
     completeDNS.ns = error;
     console.log("Ns error")
   })
}

function getPtr(domain) {
   return scope.dns.resolvePtr(domain)
   .then((response) => {
      completeDNS.ptr = response;
      console.log("Ptr success")

   })
   .catch(function(error) {
     completeDNS.ptr = error;
     console.log("Ptr error")
   })
}



}

module.exports = whois;
