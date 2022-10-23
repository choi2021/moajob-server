import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export default class Crawler {
  constructor() {
    this.wantedURL = 'https://www.wanted.co.kr';
  }

  async creatJob(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('url');

    const content = await page.content();
    const $ = cheerio.load(content);
    const titleLists = $('h6');
    const contentLists = $('p>span');
    const result = {
      name: $(titleLists[0]).text(),
      platform: 'wanted',
      id: Date.now(),
      mainWork: [],
      qualification: [],
      preferential: [],
      url,
    };

    contentLists.each((idx, node) => {
      switch (idx) {
        case 1: {
          const mainWork = $(node)
            .text()
            .split('• ')
            .filter((item) => !!item);
          result.mainWork = mainWork;
          break;
        }
        case 2: {
          const qualification = $(node)
            .text()
            .split('• ')
            .filter((item) => !!item);
          result.qualification = qualification;
          break;
        }
        case 3: {
          const preferential = $(node)
            .text()
            .split('• ')
            .filter((item) => !!item);
          result.preferential = preferential;
          break;
        }
      }
    });
    return result;
  }
}
