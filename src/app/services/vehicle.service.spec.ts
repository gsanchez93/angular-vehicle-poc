/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { VehicleService } from './vehicle.service';
import { Vehicle } from '../models/vehicle';
import { Observable } from 'rxjs';

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

describe('VehicleService:', () => {
  describe('Tests with TestBed API:', () => {
    let mockBackend: MockBackend;
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
        ]
      });
    }));

    beforeEach(inject([ MockBackend, Http ],
    (mb: MockBackend, http: Http) => {
      mockBackend = mb;
      vehicleService = new VehicleService(http);
    }));

    it('should be defined', () => {
      expect(vehicleService).toBeDefined();
    });

    it('should not call handle error from the promise when getVehicles succeeds', (done) => {
      spyOn(vehicleService.getHttp(), 'get').and.callFake(() => {
        return Observable.from([new Response(new ResponseOptions({ body: { data: mockVehicleArray } }))]);
      });
      spyOn(vehicleService, 'handleError');

      vehicleService.getVehicles().then((vehicles) => {
        expect(vehicleService.handleError).not.toHaveBeenCalled();
        done();
      });
    });

    it('should return the vehicles array from the promise when getVehicles succeeds', (done) => {
      spyOn(vehicleService.getHttp(), 'get').and.callFake(() => {
        return Observable.from([new Response(new ResponseOptions({ body: { data: mockVehicleArray } }))]);
      });

      vehicleService.getVehicles().then((vehicles) => {
        expect(vehicles).toEqual(mockVehicleArray);
        done();
      });
    });

    it('should access the url http://localhost:8081/vehicle via a GET request when getVehicles is called', (done) => {
      let mockConnection: MockConnection;
      mockBackend.connections.subscribe((connection: MockConnection) => {
        mockConnection = connection;
        mockConnection.mockRespond(new Response(new ResponseOptions({
          body: { data: mockVehicleArray }
        })));
      });

      vehicleService.getVehicles().then((vehicles) => {
        expect(mockConnection.request.method).toEqual(RequestMethod.Get);
        expect(mockConnection.request.url).toEqual('http://localhost:8081/vehicle');
        done();
      });
    });

    it('should call handle error from the promise when getVehicles fails', (done) => {
      spyOn(vehicleService.getHttp(), 'get').and.callFake(() => {
        return Observable.throw('error');
      });
      spyOn(vehicleService, 'handleError');

      vehicleService.getVehicles().then(() => {
        expect(vehicleService.handleError).toHaveBeenCalled();
        done();
      });
    });

    it('should return the vehicle based on passed in vehicleMovementId from the promise when it succeeds', (done) => {
      spyOn(vehicleService.getHttp(), 'get').and.callFake(() => {
        return Observable.from([new Response(new ResponseOptions({ body: { data: mockVehicle1 } }))]);
      });
      spyOn(vehicleService, 'handleError');

      vehicleService.getVehicle(mockVehicle1.vehicleMovementId).then((vehicle) => {
        expect(vehicleService.handleError).not.toHaveBeenCalled();
        expect(vehicle).toEqual(mockVehicle1);
        done();
      });
    });

    it('should call handle error from the promise when getVehicle fails', (done) => {
      spyOn(vehicleService.getHttp(), 'get').and.callFake(() => {
        return Observable.throw('error');
      });
      spyOn(vehicleService, 'handleError');

      vehicleService.getVehicle(mockVehicle1.vehicleMovementId).then(() => {
        expect(vehicleService.handleError).toHaveBeenCalled();
        done();
      });
    });

    xit('should call handle error with error code 504 from the promise when getVehicle times out', (done) => {
      spyOn(vehicleService.getHttp(), 'get').and.callFake(() => {
        return Observable.throw('error');
      });
      spyOn(vehicleService, 'handleError');

      vehicleService.getVehicle(mockVehicle1.vehicleMovementId).then(() => {
        expect(vehicleService.handleError).toHaveBeenCalled();
        done();
      });
    });
  });

  xdescribe('Skipped Tests for Demo:', () => {
    it('should call handle error with error code 504 from the promise when getVehicle times out', (done) => {
      // spyOn(vehicleService.getHttp(), 'get').and.callFake(() => {
      //   return Observable.throw('error');
      // });
      // spyOn(vehicleService, 'handleError');

      // vehicleService.getVehicle(mockVehicle1.vehicleMovementId).then(() => {
      //   expect(vehicleService.handleError).toHaveBeenCalled();
      //   done();
      // });
    });
  });

  // fdescribe and fit
});
