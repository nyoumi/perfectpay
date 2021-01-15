import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PerfectTransfertPage } from '../pages/pertfect-transfert/perfect-transfert';
import { LoginPage } from '../pages/login/login';
import { PerfectPaymentPage } from '../pages/pertfect-payment/perfect-payment';
import { Services } from '../services/services'; 
import { HistoryPage } from '../pages/history/history';
import { ExchangeRatePage } from '../pages/exchange-rate/exchange-rate';
import { FormBuilder } from '@angular/forms';
import { PayementService } from '../services/payement.service';



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
      public alerCtrl: AlertController,
    public formbuilder: FormBuilder,
    public services: Services, 
    private toastCtrl: ToastController,
    private payementService:PayementService,
    public loadingController: LoadingController,
     public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'historique', component: HistoryPage },
      { title: 'transfert', component: PerfectTransfertPage },
      { title: "paiement", component: PerfectPaymentPage, },
      { title: "Taux de change", component: ExchangeRatePage },
      { title: "Modifier code secret", component: ExchangeRatePage }


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
  changeSecret(){
    let alert = this.alerCtrl.create({
      mode:"ios",
      title: 'Authentification',
      message: 'Veuillez entrer votre code secret pour continuer',
      inputs: [
        {
          name: 'secret_code',
          placeholder: '123456',
          type:"password"
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          
        },
        {
          text: 'Valider',
          handler: data => {
            if(!data.secret_code) return
            let loading = this.loadingController.create({ content: "chargement..."});
            loading.present();
            console.log(data.secret_code)
            this.services.getSoldeClient(this.user[0].Indexe,data.secret_code).then((solde:any)=>{
              loading.dismiss();
              if(solde.succes==-1){
               
              }
                if(solde.succes==1){
                  let alert = this.alerCtrl.create();
                  alert.setTitle("Solde Actuel" );
                  alert.setMode("ios");
                  alert.setMessage(solde.resultat[0].Solde+ " FCFA");
                  alert.addButton("OK")
                  alert.present();
                  alert.setMode("ios")

                  return ;
                }


            })
          }
        }
      ]
    });

    
    alert.present();
    alert.setMode("ios")

    
  }
}
