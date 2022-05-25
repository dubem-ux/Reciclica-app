import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { appStoreModule } from 'src/store/appStoreModule';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PickupCallCardModule } from './component/pickup-call-card/PickupCallCardModule';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    PickupCallCardModule,
    ...appStoreModule,
    StoreDevtoolsModule.instrument({maxAge: 25})],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}


