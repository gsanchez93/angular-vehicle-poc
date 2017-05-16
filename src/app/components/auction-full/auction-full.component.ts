import { Component, OnInit } from '@angular/core';
import { Bid } from '../../models/bid';
import { Vehicle } from '../../models/vehicle';
import { VehicleService } from '../../services/vehicle.service';

declare let PushStream: any;
declare let $: any;

let pushStream: any;

@Component({
  selector: 'app-auction',
  templateUrl: './auction-full.component.html',
  styleUrls: ['./auction-full.component.css']
})

export class AuctionFullComponent implements OnInit {
  title = 'Auction - No Pagination';
  vehicles: Vehicle[] = [];
  error: any;

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles();
    this.initPushStream();
  }

  getVehicles(): Promise<Vehicle> {
    return this.vehicleService
      .getVehiclesFromLocalArray()
      .then(vehicles => {
        this.vehicles = vehicles;
      })
      .catch(error => this.error = error);
  }

  trackVehicle(index, vehicle) {
    console.log(vehicle);
    return vehicle ? vehicle.vehicleMovementId : undefined;
  }

  initPushStream() {
    pushStream = new PushStream({
      host: 'ec2-34-209-179-208.us-west-2.compute.amazonaws.com',
      modes: "websocket|eventsource|stream"
    });

    pushStream.onmessage = (bidEvent) => {
      if (bidEvent && bidEvent !== '') {
        let bid = $.parseJSON(bidEvent);

        let bidder = bid.bidder;
        let vehicleId = bid.vehicleMovementId;
        let amount = bid.amount;

        console.log('New Bid Event: ' + bid.vehicleMovementId + ' ' + bid.amount);

        for (let vehicle of this.vehicles) {
          if (vehicle.vehicleMovementId == vehicleId) {
            console.log('Updated UI: Bid $' + bid.amount + ' from ' + bid.bidder + ' for vehicle ' +
              vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model + ' ' + vehicle.vin);

            vehicle.bidAmount = bid.amount;
            vehicle.bidder = bid.bidder;
            if(bid.bidderAvatar){
              vehicle.bidderImageUrl = bid.bidderAvatar;
            } else {
              vehicle.bidderImageUrl = 'http://localhost:8081/images/avatarPlaceholder.png';
            }
          }
        }
      }
    };

    pushStream.onstatuschange = (state) => {
      if (state === PushStream.OPEN) {
        console.log('PushStream is now ONLINE');
      } else {
        console.log('PushStream is now OFFLINE');
      }
    };

    this.connectPushStream('auction');
  }

  connectPushStream(channel) {
    pushStream.removeAllChannels();
    try {
      pushStream.addChannel(channel);
      pushStream.connect();
    } catch (e) { alert(e); };
  }

  bid(vehicleMovementId: number, currentBid: string, bidamount: number) {
    console.log('detected manual bid: ' + vehicleMovementId + ' ' + bidamount);

    let newBid: Bid = {
      vehicleMovementId: vehicleMovementId,
      bidder: 'Angular',
      bidderAvatar: 'http://localhost:8081/images/angular.png',
      amount: 0
    };

    if (bidamount && bidamount > 0) {
      newBid.amount = bidamount;
      pushStream.sendMessage(JSON.stringify(newBid));
    } else {
      if (currentBid) {
        newBid.amount = parseInt(currentBid) + 500;
      } else {
        newBid.amount = 500;
      }
      pushStream.sendMessage(JSON.stringify(newBid));
    }
  };
}
