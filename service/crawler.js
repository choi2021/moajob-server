import cheerio from 'cheerio';
import axios from 'axios';

const getHTML = async () => {
  try {
    return await axios.get('https://www.wanted.co.kr/wd/124677');
  } catch (error) {
    console.error(error);
  }
};

getHTML().then((html) => {
  let ulList = [];
  const $ = cheerio.load(html.data);
  const $titleList = $('h6');
  const $pList = $('p');
  $pList.each((idx, elem) => {
    console.log($(elem).text());
  });
});
