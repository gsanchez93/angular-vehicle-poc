import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle'

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})

export class VehicleInfoComponent implements OnInit {
    @Input() vehicle: Vehicle;

    constructor(
      private vehicleService: VehicleService,
      private route: ActivatedRoute,
      private location: Location
    ) {}

    ngOnInit(): void {
      this.route.params
        .switchMap((params: Params) => this.vehicleService.getVehicle(+params['id']))
        .subscribe(vehicle => this.vehicle = vehicle);
    }

    goBack(): void {
      this.location.back();
    }
}
