import { VillaCarPage } from './app.po';

describe('villa-car App', () => {
  let page: VillaCarPage;

  beforeEach(() => {
    page = new VillaCarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
