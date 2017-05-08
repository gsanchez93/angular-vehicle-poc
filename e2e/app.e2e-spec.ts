import { RootPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Main Page - Auction Tab - E2E:', function() {
  let page: RootPage;

  beforeEach(() => {
    page = new RootPage();
  });

  it('should display site title Vehicle App in Angular 2', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Vehicle App in Angular 2');
  });

  it('should render a list of 500 vehicles', () => {
    page.navigateTo();
    expect(page.getVehicleElements().count()).toEqual(500);
  });

  it('should render the correct first vehicle', () => {
    page.navigateTo();

    const firstVehicle = page.getVehicleElements().first();

    expect(firstVehicle.element(by.css('.vehicle-label')).getText()).toBe('1995 Nissan Pathfinder 4WD V8, Turbo Dsl 6.4L');
    expect(firstVehicle.element(by.css('.vehicle-mileage')).getText()).toBe('91,064 mi');
    expect(firstVehicle.element(by.css('.vehicle-color')).getText()).toBe('Blue');
    expect(firstVehicle.element(by.css('.vehicle-kbb')).getText()).toContain('$4,604');
    expect(firstVehicle.element(by.css('img.vehicle-image')).getAttribute('src')).toContain('10.jpeg');
  });

  it('should render the correct 500th vehicle', () => {
    page.navigateTo();

    const firstVehicle = page.getVehicleElements().get(499);

    expect(firstVehicle.element(by.css('.vehicle-label')).getText()).toBe('1996 Toyota Corolla RWD V6, HO, 3.5 Liter');
    expect(firstVehicle.element(by.css('.vehicle-mileage')).getText()).toBe('132,885 mi');
    expect(firstVehicle.element(by.css('.vehicle-color')).getText()).toBe('White');
    expect(firstVehicle.element(by.css('.vehicle-kbb')).getText()).toContain('$1,635');
    expect(firstVehicle.element(by.css('img.vehicle-image')).getAttribute('src')).toContain('7.jpg');
  });
});

// /* Locator - Query for Single Elements */
//   element(by.id('addbutton'));	// <button id="addbutton"></button>
//   element(by.css('h2'));	// <h2></h2>
//   element(by.css('.special'));	// <span class="special"></span>
//   element(by.css('h2.special'));	// <h2 class="special"></h2>

//   element(by.css('my-css'));	// is the same as
//   $('my-css');			// short cut selector  ( css selectors )

// /* Query for Multiple Elements */
//   element.all(by.css('.selector')).then((elements) => {
//     /* elements is an array of ElementFinders. */
//   });
//   element.all(locator).count();
//   element.all(locator).get(index);
//   element.all(locator).first();
//   element.all(locator).last();

// /* Chaining Queries */
//   element(by.css('some-css')).element(by.tagName('tag-within-css')); // sub-element of element
//   element(by.css('some-css')).all(by.tagName('tag-within-css')); // sub-elements of element
//   element.all(by.css('some-css')).first().element(by.tagName('tag-within-css')); // sub-element of first element

// /* Element Actions */
//   var el = element(locator);
//   el.click(); // Click on the element
//   el.sendKeys('my text'); // Send keys to the element (usually an input)
//   el.clear(); // Clear the text in an element (usually an input)
//   el.getAttribute('value'); // Get the value of an attribute, for example, get the value of an input

// /* Page Navigation */
//   browser.get(url);