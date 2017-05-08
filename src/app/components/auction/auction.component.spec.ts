/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuctionComponent } from './auction.component';

const mockVehicle1: Vehicle = <Vehicle>{
  vehicleMovementId: 20000,
  year: 1995,
  make: 'Nissan',
  model: 'Pathfinder',
  trim: '4WD V8, Turbo Dsl 6.4L',
  mileage: 91064,
  vin: '468F49272M9K3RM39',
  color: 'Blue',
  location: 'Tracy CA',
  zipcode: 95304,
  askingPrice: 5995,
  kbb: 4604,
  inspected: true,
  crRating: 3.1,
  imageFile: 'http://localhost:8081/images/10.jpeg'};
const mockVehicle2: Vehicle = <Vehicle>{
  vehicleMovementId: 20001,
  year: 2000,
  make: 'Honda',
  model: 'Accord',
  trim: 'FWD 4-Cyl, Turbo, 2.0 Liter',
  mileage: 117627,
  vin: '76V891TT3X8F55563',
  color: 'Silver',
  location: 'Tracy CA',
  zipcode: 95304,
  askingPrice: 3874,
  kbb: 4684,
  inspected: false,
  crRating: 3.6,
  imageFile: 'http://localhost:8081/images/6.jpg'};
const mockVehicle3: Vehicle = <Vehicle>{
  vehicleMovementId: 20002,
  year: 2011,
  make: 'Toyota',
  model: 'Camry',
  trim: 'RWD 4-Cyl, Turbo, 2.0 Liter',
  mileage: 28429,
  vin: '68DXYLL3592KDE739',
  color: 'Red',
  location: 'Sacramento CA',
  zipcode: 94203,
  askingPrice: 5843,
  kbb: 3332,
  inspected: true,
  crRating: 3.5,
  imageFile: 'http://localhost:8081/images/7.jpg'};
const mockVehicleArray: Array<Vehicle> = [mockVehicle1, mockVehicle2, mockVehicle3];

describe('AuctionComponent:', () => {
  let component: AuctionComponent;
  let fixture: ComponentFixture<AuctionComponent>;
  let vehicleService: VehicleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        VehicleService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      declarations: [
        AuctionComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AuctionComponent);
        component = fixture.componentInstance;
        vehicleService = TestBed.get(VehicleService);
      });
  }));

  describe('Unit Tests:', () => {
    it('should be truthy', () => {
      expect(component).toBeTruthy();
    });

    it('should have a title attribute', () => {
      expect(component.title).toBeTruthy();
    });

    it('should have a title attribute with value Auction - With Pagination', () => {
      expect(component.title).toBe('Auction - With Pagination');
    });

    it('should have an array of vehicles', () => {
      expect(component.vehicles).toBeTruthy();
    });

    it('should call getVehicles and set vehicles to the returned object if it succeeds', (done) => {
      spyOn(vehicleService, 'getVehicles').and.callFake(() => {
        return Promise.resolve(mockVehicleArray);
      });

      component.getVehicles().then(() => {
        expect(vehicleService.getVehicles).toHaveBeenCalled(); /*?.*/
        expect(vehicleService.getVehicles).toHaveBeenCalledTimes(1); /*?.*/
        expect(component.vehicles).toBe(mockVehicleArray); /*?.*/
        done();
      });
    });

    it('should call getVehicles and set error to the returned error if it fails', (done) => {
      const errorMsg = 'Some error';
      spyOn(vehicleService, 'getVehicles').and.callFake(() => {
        return Promise.reject(errorMsg);
      });

      component.getVehicles().then(() => {
        expect(vehicleService.getVehicles).toHaveBeenCalled();
        expect(vehicleService.getVehicles).toHaveBeenCalledTimes(1);
        expect(component.error).toBe(errorMsg);
        done();
      });
    });

    it('should initialize and call getVehicles', () => {
      // arrange
      spyOn(component, 'getVehicles');

      // act
      component.ngOnInit();

      // assert
      expect(component.getVehicles).toHaveBeenCalled();
      expect(component.getVehicles).toHaveBeenCalledTimes(1);
    });
  });

  describe('UI Tests: ', () => {
    let vehiclesElement;

    beforeEach(() => {
      fixture.componentInstance.vehicles = mockVehicleArray;
      fixture.detectChanges();
    });

    it('should render title in a h2 tag and contain value Auction - With Pagination', () => {
      vehiclesElement = fixture.nativeElement;
      expect(vehiclesElement.querySelector('h2').textContent).toContain('Auction - With Pagination'); /*?.*/
    });

    it('should have 3 vehicle-row\'s when vehicles is populated', () => {
      vehiclesElement = fixture.nativeElement;
      expect(vehiclesElement.querySelectorAll('.vehicle-row').length).toBe(mockVehicleArray.length); /*?.*/
    });
  });
});
