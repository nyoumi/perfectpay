import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

//import { CallInterfacePage } from '../callInterface/callInterface';
//import { UserSms } from '../userSms/userSms';
import { IonicPage, AlertController, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import {Http} from '@angular/http';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe';
import { environment } from '../../environment/environment'; 
import { Services } from '../../services/services';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-stripePayment',
  templateUrl: 'stripePayment.html'
})
export class StripePayment { 
  form;
  pageTitle = "payement par carte bancaire";
  montant: String;
  numeroDest: string;
  selectedMessages:number[]=new Array(0);
  selection:boolean=false;
  private user:any;
  private secureKey: string;
  private secureIV: string;

  /**
   * TODO trouver comment transmettre les infos à une nouvelle fenetre
   * et remplacer par destNumber 
   */

  constructor(public navCtrl: NavController, 
    private alerCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    private http: HTTP, 
    private h:Http,
    public services: Services,
    private service: Services,
    private params: NavParams,
    private stripe:Stripe,

  ) {
    this.services.daoGetStatus().then(status=>{
      if(status!=true){
        this.navCtrl.setRoot(LoginPage)
      }

     });
   
    this.form = new FormGroup({
      expDate: new FormControl("", Validators.required),
      cardNumber: new FormControl("", Validators.required),
      cvc: new FormControl("", Validators.required)
    });
    this.stripe.setPublishableKey(environment.pk_stripe);
    this.service.daoGetgetUserInfo().then(user=>{
      this.user=user; 
    });
    console.log("montant stripe" + this.params.get('param'));
    console.log("choix stripe" + this.params.get('choix'));
    //this.generateSecureKeyAndIV();
  }

  processForm() {
    let cvc = this.form.value.cvc;
    let expDate = this.form.value.expDate;
    let cardNumber = this.form.value.cardNumber;
  

    if (this.form.status === 'VALID') {
      let cvc = this.form.value.cvc;
      let expDate:string = this.form.value.expDate;
      let cardNumber = this.form.value.cardNumber;

      let card = {  
        number: cardNumber,
        expMonth: +expDate.substring(5),  
        expYear:  +expDate.substring(0,4),  
        cvc: cvc 
      };

      console.log(card);

      let loader = this.loadingCtrl.create({
        content: "Opération en cours...",
        showBackdrop: true,
        spinner: "ios",
        dismissOnPageChange: true,
        enableBackdropDismiss: true

      });
      loader.present();
    console.log("montant stripe" + this.params.get('param'));
 
    this.stripe.createCardToken(card)
   .then(token =>{ 
     console.log("tokenid" + token.id);
    //loader.setContent(token.id); 
    this.h.get(environment.stripePayementV2 + token.id 
      + "/" + this.user.idClient + "/" + this.params.get('param')+ "/" + this.params.get('choix'))
      .map(resp => resp.json()).subscribe(resp=>{ 
      loader.dismiss();
      let alert = this.alerCtrl.create();
      switch (resp)
      {
        case 1: 
        alert.setMode("ios");
alert.setMessage("Paiement éffectué avec success"); 
        alert.addButton({
          text: 'OK',
          handler: data => {
            this.navCtrl.push('PrincipalPage');
          }
        });
        alert.present();
        break;
        case -1: 
        alert.setMode("ios");
alert.setMessage("échec de paiement. Veuillez réessayer"); 
        alert.present();
        break;
        case -2: 
        alert.setMode("ios");
alert.setMessage("échec de paiement. Veuillez réessayer"); 
        alert.present();
        break;
        default:
        alert.setMode("ios");
alert.setMessage("échec de paiement. Veuillez réessayer"); 
        alert.present();
        break;
      }
      alert.present();
  
      
  
    },error => {
      loader.dismiss();
      let alert = this.alerCtrl.create();
      alert.setTitle(error.status.toString());
      alert.setMode("ios");
alert.setMessage(error.error);
      alert.present();
    
     
    });
  }

  )
   .catch(error => {console.error(error);
  loader.setContent(error);
  }); 
  

    }
  }

}
