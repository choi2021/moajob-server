import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';

const app = express();
let jobs = [
  {
    name: '오피지지(OP.GG)',
    platform: 'wanted',
    id: '1',
    main_work: ['OGT 웹사이트 최적화', 'OGT 글로벌 플랫폼 개발 및 운영'],
    qualification: [
      'Javascript의 대한 높은 이해도를 보유하신 분',
      'Next.js, React.js을 활용한 개발 경험이 있으신 분',
      'HTTP, Networking에 대한 높은 이해도를 보유하신 분',
      'HTML, CSS 등 마크업에 대한 충분한 이해도가 있으신 분',
      'Server Side Rendering에 대한 높은 이해도를 보유하신 분',
      '자신이 만드는 서비스와 기능에 대한 책임감이 높으신 분',
      '다양한 직군의 사람들과 원활한 협업이 가능하신 분',
    ],
    preferential: [
      '프로젝트를 스스로 리딩 해본 경험이 있으신 분',
      'i18n을 적용한 글로벌 서비스에 대한 경험이 있으신 분',
      'Next.js를 이용하여 서버 사이드 렌더링 개발 경험이 있으신 분',
      '사용자를 위한 UI/UX 경험 개선을 지향하는 성향을 지니신 분',
      '프로젝트 기획 단계부터 출시까지 모든 과정에 참여하신 경험이 있으신 분',
      'E스포츠 게임을 즐기거나 게임 및 시장에 대한 높은 이해도를 보유하신 분',
      '서비스 운영에 있어 Search Engine Optimization, User Retention, Acquisition에 대한 경험이 있으신 분',
    ],
    url: 'https://www.wanted.co.kr/wd/124677',
  },
  {
    name: '오피지지(OP.GG)',
    platform: 'Wanted',
    id: '2',
    main_work: ['OGT 웹사이트 최적화', 'OGT 글로벌 플랫폼 개발 및 운영'],
    qualification: [
      'Javascript의 대한 높은 이해도를 보유하신 분',
      'Next.js, React.js을 활용한 개발 경험이 있으신 분',
      'HTTP, Networking에 대한 높은 이해도를 보유하신 분',
      'HTML, CSS 등 마크업에 대한 충분한 이해도가 있으신 분',
      'Server Side Rendering에 대한 높은 이해도를 보유하신 분',
      '자신이 만드는 서비스와 기능에 대한 책임감이 높으신 분',
      '다양한 직군의 사람들과 원활한 협업이 가능하신 분',
    ],
    preferential: [
      '프로젝트를 스스로 리딩 해본 경험이 있으신 분',
      'i18n을 적용한 글로벌 서비스에 대한 경험이 있으신 분',
      'Next.js를 이용하여 서버 사이드 렌더링 개발 경험이 있으신 분',
      '사용자를 위한 UI/UX 경험 개선을 지향하는 성향을 지니신 분',
      '프로젝트 기획 단계부터 출시까지 모든 과정에 참여하신 경험이 있으신 분',
      'E스포츠 게임을 즐기거나 게임 및 시장에 대한 높은 이해도를 보유하신 분',
      '서비스 운영에 있어 Search Engine Optimization, User Retention, Acquisition에 대한 경험이 있으신 분',
    ],
    url: 'https://www.wanted.co.kr/wd/124677',
  },
];

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.get('/jobs', (req, res, next) => {
  const platform = req.query.platform;
  const data = platform
    ? jobs.filter((item) => item.platform === platform)
    : jobs;
  res.status(200).json(data);
});

app.post('/jobs', (req, res, next) => {
  const { url, platform } = req.body;
  const job = jobs[0]; //cheerio로 크롤링해야해, 에러 조건도 달아줘야해
  jobs = [job, ...jobs];
  console.log(jobs);
  res.status(201).json(job);
});

app.delete('/jobs/:id', (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  jobs.filter((job) => job.id != id);
  res.sendStatus(204);
});

app.use((req, res, next) => {
  res.status(404);
});

app.use((error, req, res, next) => {
  res.status(500).send('something wrong');
});

app.listen(4000);
