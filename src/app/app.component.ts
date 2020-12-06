import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PerfectTransfertPage } from '../pages/pertfect-transfert/perfect-transfert';
import { LoginPage } from '../pages/login/login';
import { PerfectPaymentPage } from '../pages/pertfect-payment/perfect-payment';
import { Services } from '../services/services'; 
import { HistoryPage } from '../pages/history/history';
import { ExchangeRatePage } from '../pages/exchange-rate/exchange-rate';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  status:boolean;
  user:any;


  pages: Array<{title: string, component: any}>;
  secretStatus: boolean=false;

  constructor(public platform: Platform,
    private  services:Services, 
     public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'historique', component: HistoryPage },
      { title: 'transfert', component: PerfectTransfertPage },
      { title: "paiement", component: PerfectPaymentPage, },
      { title: "Taux de change", component: ExchangeRatePage }


    ];

  }
  async ngOnInit() {
    //this.rootPage=PrincipalPage;
   await this.initializeApp(); 

   
   this.services.daoGetgetUserInfo().then(infos=>{
     this.user=infos; });   
     this.services.daoGetHaveUsed().then(infos=>{
       console.log(infos)
      this.secretStatus=infos; }); 
 }
 disconnect(){
   this.services.disconnect().then(data=>{
     this.nav.setRoot(LoginPage)
   })

 }
  async initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
      /**
     * verifie si c'est la première utilisation
     */
     await this.services.daoGetStatus().then((status:any)=>{
      this.status=status;
      switch (this.status) {
        case false:
          this.rootPage=LoginPage;
          break;
   
        case true:
          this.rootPage=HomePage;  
          break;

        default:
          this.rootPage=LoginPage;
          break;
      }  

     });
     return true;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  secretUpdate(){

  }
  verifySecret(){

  }
}
