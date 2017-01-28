import { Wmr01Page } from './app.po';

describe('wmr01 App', function() {
  let page: Wmr01Page;

  beforeEach(() => {
    page = new Wmr01Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
