import { Front.Pulsar.LocalPage } from './app.po';

describe('front.pulsar.local App', () => {
  let page: Front.Pulsar.LocalPage;

  beforeEach(() => {
    page = new Front.Pulsar.LocalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
