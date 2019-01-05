function sslCheck (req, res, next){

  var domain = req.params.domain;

  (async () => {
  const browser = await req.puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://www.digicert.com/help/');
  await page.type('#host', domain);
  await page.click('#check-server-button');
  await page.waitForSelector('.ok');
  var results = await page.evaluate(() => document.querySelector('#results').innerHTML);
  await browser.close();
  await res.send(results);
})();

}

module.exports = sslCheck
