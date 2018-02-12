const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');
const argv = require('yargs').argv;
const prettier = require('prettier');

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
    const componentHtml = $.html(component);
    const prettierFormatedHtml = prettier
        .format(componentHtml, { semi: false })
        .slice(1);

    fs.writeFileSync(output, prettierFormatedHtml, 'utf8');

    browser.close();
})();
