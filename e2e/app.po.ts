import { browser, element, by } from 'protractor';

export class RootPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h2')).getText();
  }

  getVehicleElements() {
    return element.all(by.css('.vehicle-row'));
  }
}
