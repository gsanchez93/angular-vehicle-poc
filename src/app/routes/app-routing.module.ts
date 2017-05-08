import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuctionComponent }     from '../components/auction/auction.component';
import { AuctionFullComponent } from '../components/auction-full/auction-full.component';
import { VehicleInfoComponent } from '../components/vehicle-info/vehicle-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/auction', pathMatch: 'full' },
  { path: 'auction',  component: AuctionComponent },
  { path: 'auction-full',  component: AuctionFullComponent },
  { path: 'info/:id', component: VehicleInfoComponent },
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
