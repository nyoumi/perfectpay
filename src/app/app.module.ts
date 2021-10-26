import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';

import { LoginPage } from '../pages/login/login';

import { RegisterPage } from '../pages/register/register';
import { ExchangeRatePage } from '../pages/exchange-rate/exchange-rate';
import { PerfectTransfertPage } from '../pages/pertfect-transfert/perfect-transfert';
import { PerfectPaymentPage } from '../pages/pertfect-payment/perfect-payment'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QRScanner } from '@ionic-native/qr-scanner';


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


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HistoryPage,
    LoginPage,
    RegisterPage,
    PerfectTransfertPage ,  
    ExchangeRatePage,
    PerfectPaymentPage,
    PerfectRetraitPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    GimacModule

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
    ExchangeRatePage,
    HistoryPage,


  ],
  providers: [
    StatusBar,
    SplashScreen,
    QRScanner, 
    PayPal,
    Stripe,
    HTTP,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Services,
    ParametreService,
    PayementService,
    InAppBrowser,

  ]
})
export class AppModule {}
