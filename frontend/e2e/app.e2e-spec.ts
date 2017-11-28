import { WeflatPage } from './app.po';

describe('weflat App', () => {
  let page: WeflatPage;

  beforeEach(() => {
    page = new WeflatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
