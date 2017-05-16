import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Vehicle } from '../models/vehicle';
import { VehicleData } from '../vehicle-data';

@Injectable()
export class VehicleService {
  private serverUrl = 'http://localhost';
  private serverPort = 8081;
  private vehiclePath = 'vehicle';
  private bidPath = 'bids';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  private vehicleData = new VehicleData();

  private vehicleVer1kPath = 'vehicle1k';
  private vehicleVer2kPath = 'vehicle2k';
  private vehicleVer5kPath = 'vehicle5k';
  private vehicleVer30kPath = 'vehicle30k';
  private vehicleVer50kPath = 'vehicle50k';

  constructor(private http: Http) { }

  getHttp(): Http {
    return this.http;
  }

  getVehicle(vehicleMovementId: number): Promise<Vehicle> {
      const url = `${this.serverUrl}:${this.serverPort}/${this.vehiclePath}/${vehicleMovementId}`;
      // console.log(url);
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Vehicle)
          .catch(this.handleError);
  }

  getVehicles(): Promise<Vehicle[]> {
      const url = `${this.serverUrl}:${this.serverPort}/${this.vehiclePath}`;
      // console.log(url);
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Vehicle[])
          .catch(this.handleError);
  }

  getVehiclesFromLocalArray(): Promise<Vehicle[]> {
      return Promise.resolve(this.vehicleData.getVehicleData());
  }

  handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
  }

/*
  // ToDo: Implement Bid Post; Vehicle PUT and DELETE
  create(name: string): Promise<Hero> {
    return this.http
      .post(this.serverUrl
, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Hero)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.serverUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.serverUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
*/

  getVehiclesVer1k(): Promise<Vehicle[]> {
      const url = `${this.serverUrl}:${this.serverPort}/${this.vehicleVer1kPath}`;
      console.log(url);
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Vehicle[])
          .catch(this.handleError);
  }

  getVehiclesVer2k(): Promise<Vehicle[]> {
      const url = `${this.serverUrl}:${this.serverPort}/${this.vehicleVer2kPath}`;
      console.log(url);
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Vehicle[])
          .catch(this.handleError);
  }

  getVehiclesVer5k(): Promise<Vehicle[]> {
      const url = `${this.serverUrl}:${this.serverPort}/${this.vehicleVer5kPath}`;
      console.log(url);
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Vehicle[])
          .catch(this.handleError);
  }

  getVehiclesVer30k(): Promise<Vehicle[]> {
      const url = `${this.serverUrl}:${this.serverPort}/${this.vehicleVer30kPath}`;
      console.log(url);
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Vehicle[])
          .catch(this.handleError);
  }

  getVehiclesVer50k(): Promise<Vehicle[]> {
      const url = `${this.serverUrl}:${this.serverPort}/${this.vehicleVer50kPath}`;
      console.log(url);
      return this.http.get(url)
          .toPromise()
          .then(response => response.json().data as Vehicle[])
          .catch(this.handleError);
  }
}
