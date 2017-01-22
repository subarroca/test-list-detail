import { TestListDetailPage } from './app.po';

describe('test-list-detail App', function() {
  let page: TestListDetailPage;

  beforeEach(() => {
    page = new TestListDetailPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('kw works!');
  });
});
