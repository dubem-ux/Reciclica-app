import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupCallCardComponent } from './pickup-call-card.component';
import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorMessageModule } from '../error-message/error-message.module';
import { LoadingModule } from '../loading/error-message.module';




@NgModule({
  declarations: [PickupCallCardComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ErrorMessageModule,
    LoadingModule
  ],
  exports: [PickupCallCardComponent,
    ErrorMessageModule,
    LoadingModule
  ]
})
export class PickupCallCardModule {
}
