import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';

import { LoginPage } from '../pages/login/login';

import { RegisterPage } from '../pages/register/register';
import { PerfectTransfertPage } from '../pages/pertfect-transfert/perfect-transfert';
import { PerfectPaymentPage } from '../pages/pertfect-payment/perfect-payment'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { Services } from '../services/services';
import { ParametreService } from '../services/parametre.service';
import { HTTP } from '@ionic-native/http';

import { HttpModule } from '@angular/http';

import { Stripe } from '@ionic-native/stripe';
import { PayementService } from '../services/payement.service';

import { PayPal } from '@ionic-native/paypal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PerfectRetraitPage } from '../pages/pertfect-retrait/perfect-retrait';

import { GimacModule } from '../pages/gimac/gimac.module';
import { NgxQRCodeModule } from "ngx-qrcode2";
import { QRScanner } from '@ionic-native/qr-scanner';
import { QRCodeModule } from 'angularx-qrcode';
import { QrcodePage } from '../pages/qrcode/qrcode';
import { SocialSharing } from '@ionic-native/social-sharing';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HistoryPage,
    LoginPage,
    RegisterPage,
    PerfectTransfertPage ,  
    PerfectPaymentPage,
    PerfectRetraitPage,
    QrcodePage


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    GimacModule,
    NgxQRCodeModule,
    QRCodeModule
    


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PerfectTransfertPage,
    PerfectPaymentPage ,
    PerfectRetraitPage,
    HistoryPage,
    QrcodePage

  ],
  providers: [
    StatusBar, 
    SplashScreen,
    PayPal,
    Stripe,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Services,
    ParametreService,
    PayementService,
    InAppBrowser,
    QRScanner,
    SocialSharing
    
  ]
})
export class AppModule {}
