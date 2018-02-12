const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const argv = require('yargs').argv;
const beautify_html = require('js-beautify').html;

(async () => {
  const { o: output, u: url, s: selector } = argv;

  if (!url || !output || !selector) {
    return;
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForSelector(selector);

  const html = await page.content();
  const $ = cheerio.load(html);
  const component = $(selector);
  fs.writeFileSync(output, $.html(component), 'utf8');

  browser.close();
})();
