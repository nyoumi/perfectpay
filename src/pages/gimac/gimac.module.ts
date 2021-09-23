import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HomeGimacPage } from './home-gimac/home-gimac';
import { GimacServices } from './gimac-services/gimac-services';
import { GimacPayementService } from './gimac-services/gimac-payement.service';
import { CommonModule } from '@angular/common';
import { GimacTransfertPage } from './gimac-transfert/gimac-transfert';




@NgModule({
  declarations: [
    HomeGimacPage,
    GimacTransfertPage,
    

  ],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule


  ],
  bootstrap: [IonicApp],
  entryComponents: [

    HomeGimacPage,
    GimacTransfertPage,
    


  ],
  providers: [
    GimacPayementService,
    GimacServices
    

  ]
})
export class GimacModule {}
