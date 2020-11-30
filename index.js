'use strict';

const puppeteer = require('puppeteer');
const request_client = require('request-promise-native');

// console.log(process.argv);

const URL = process.argv[2]
  ? process.argv[2]
  : 'https://www.sport.pl/pilka/7,158811,25785397,w-piatek-dwa-mecze-ekstraklasy-jak-szanse-oceniaja-bukmacherzy.html';
const SUBSTRING = process.argv[3]
  ? process.argv[3]
  : 'rodo';

(async () => {

  let result = 0;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 10000
  });

  await page.setRequestInterception(true);

  page.on('request', request => {
    request_client({
      uri: request.url(),
      resolveWithFullResponse: true
    })
      .then(response => {
        const request_url = request.url();
        if (request_url.includes(SUBSTRING)) {
          result++;
          console.log(request_url);
        }
        request.continue();
      })
      .catch(error => {
        // console.error('error');
        request.abort();
      });
  });

  await page.goto(URL, {
    waitUntil: 'networkidle2'
  });

  await browser.close();

  if (result === 0) {
    process.exit(1);
  }
})();
