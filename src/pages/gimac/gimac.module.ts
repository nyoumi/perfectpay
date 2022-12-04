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
import { GimacScannerPage } from "./gimac-scanner/gimac-scanner";

import { QRCodeModule } from 'angularx-qrcode';
import { GimacHistoryPage } from './gimac-history/gimac-history';
import { LoaderController } from '../../app/LoaderController';
import { GimacServicePaymentPage } from './gimac-service-payment/gimac-service-payment';
import { GimacTopupPage } from './gimac-topup/gimac-topup';


@NgModule({
  declarations: [
    HomeGimacPage,
    GimacTransfertPage,
    GimacVoucherPage,
    VoucherHistoryPage,
    GimacPaymentPage,
    GimacScannerPage,
    GimacHistoryPage,
    GimacServicePaymentPage,
    GimacTopupPage
    

  ],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule,QRCodeModule


  ],
  bootstrap: [IonicApp], 
  entryComponents: [

    HomeGimacPage,
    GimacTransfertPage,
    GimacVoucherPage,
    VoucherHistoryPage,
    GimacPaymentPage,
    GimacScannerPage,
    GimacHistoryPage,
    GimacServicePaymentPage,
    GimacTopupPage
    


  ],
  providers: [
    GimacPayementService,
    GimacServices,
    LoaderController
    

  ]
})
export class GimacModule {}
