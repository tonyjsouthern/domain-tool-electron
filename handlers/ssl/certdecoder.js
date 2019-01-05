function certDecoder (req, res, next){

  var cert = req.body.cert;

    (async () => {
    const browser = await req.puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://www.sslshopper.com/certificate-decoder.html');
    await page.type('#certBox', cert);
    await page.waitForSelector('#decodedInfo');
    await page.screenshot({path: 'amazon_nyan_cat_pullovers_list.png'})
    var results = await page.evaluate(() => document.querySelector('#results').innerHTML);
    await browser.close();
    await res.send(results);
  })();

}

module.exports = certDecoder;
