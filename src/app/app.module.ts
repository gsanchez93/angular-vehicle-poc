import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './routes/app-routing.module';

import { AppComponent } from './app.component';
import { AuctionComponent } from './components/auction/auction.component';
import { AuctionFullComponent } from './components/auction-full/auction-full.component';
import { VehicleInfoComponent } from './components/vehicle-info/vehicle-info.component';

import { VehicleService } from './services/vehicle.service';
import { PagerService } from './services/pager.service';

@NgModule({
  declarations: [
    AppComponent,
    AuctionComponent,
    AuctionFullComponent,
    VehicleInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    VehicleService,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
