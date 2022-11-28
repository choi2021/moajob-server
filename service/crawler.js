import cheerio from 'cheerio';
import puppeteer from 'puppeteer';

const MAINWORK = '주요업무';
const QUALIFICATION = '자격요건';
const PREFERENTIAL = '우대사항';

const DotRegex = /(?<=• )(.*?)(?=<br>)/gm;

export default class Crawler {
  constructor() {
    this.wantedURL = 'https://www.wanted.co.kr/wd';
  }

  checkUrl(url) {
    return url.startsWith(this.wantedURL);
  }

  async creatJob(url) {
    if (!this.checkUrl(url)) {
      throw new Error('잘못된 URL입니다.');
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const content = await page.content();
    const $ = cheerio.load(content);
    const imgLists = $('img');
    const name = $('h6');
    const result = {
      name: $(name[0]).text(),
      platform: 'wanted',
      id: Date.now(),
      mainWork: [],
      qualification: [],
      preferential: [],
      url,
      img: '',
    };

    imgLists.each((idx, node) => {
      if (idx == 1) {
        result.img = $(node).attr('src');
      }
    });

    const titleList = $('.JobDescription_JobDescription__VWfcb > h6');
    const contentList = $(
      '.JobDescription_JobDescription__VWfcb > h6+p > span'
    );

    const target = {};

    titleList.each((idx, node) => {
      const text = $(node).text();
      switch (text) {
        case MAINWORK:
          target[idx] = 'mainwork';
          break;
        case QUALIFICATION:
          target[idx] = 'qualification';
          break;
        case PREFERENTIAL:
          target[idx] = 'preferential';
          break;
        default:
      }
    });

    contentList.each((idx, node) => {
      if (idx in target) {
        const html = $(node).html();
        const isDot = !!html.match(DotRegex);
        const base = isDot ? '• ' : '-';
        const endPoint = html.search('<br><br>');
        const data = html
          .slice(0, endPoint)
          .split(base)
          .join('')
          .split('<br>')
          .filter((item) => !!item);
        result[target[idx]] = data;
      }
    });

    await browser.close();
    return result;
  }
}
