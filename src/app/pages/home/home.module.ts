import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { PickupCallCardModule } from 'src/app/component/pickup-call-card/PickupCallCardModule';
import { PickupCallCardComponent } from 'src/app/component/pickup-call-card/pickup-call-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    PickupCallCardModule

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
