import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HomeGimacPage } from './home-gimac/home-gimac';
import { GimacServices } from './gimac-services/gimac-services';
import { GimacPayementService } from './gimac-services/gimac-payement.service';
import { CommonModule } from '@angular/common';
import { GimacTransfertPage } from './gimac-transfert/gimac-transfert';
import { GimacVoucherPage } from './gimac-voucher/gimac-voucher';
import { VoucherHistoryPage } from './voucher-history/voucher-history';
import { GimacPaymentPage } from './gimac-payment/gimac-payment';




@NgModule({
  declarations: [
    HomeGimacPage,
    GimacTransfertPage,
    GimacVoucherPage,
    VoucherHistoryPage,
    GimacPaymentPage
    

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
    GimacVoucherPage,
    VoucherHistoryPage,
    GimacPaymentPage
    


  ],
  providers: [
    GimacPayementService,
    GimacServices
    

  ]
})
export class GimacModule {}
