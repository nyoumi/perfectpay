import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
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
import { Deeplinks } from '@ionic-native/deeplinks';
import { NFC, Ndef } from '@ionic-native/nfc';
import { AppAvailability } from '@ionic-native/app-availability';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PerfectTransfertPage ,  
    PerfectPaymentPage,
    PerfectRetraitPage,
    QrcodePage,


  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    GimacModule,
    NgxQRCodeModule,
    QRCodeModule,



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
    QrcodePage,
    
    

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
    SocialSharing,
    Deeplinks,
    NFC,
    Ndef,
    AppAvailability
    
    
    
  ]
})
export class AppModule {}