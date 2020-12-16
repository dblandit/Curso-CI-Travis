const dbUtil = require('./mongodbUtil');

beforeAll(() => {
  return dbUtil.connect(process.env.DB_NAME);
});

beforeEach(() => {
  return dbUtil.seedDB();
});

afterEach(() => {
  return dbUtil.deleteCollections();
});

afterAll(() => {
  return dbUtil.disconnect();
});