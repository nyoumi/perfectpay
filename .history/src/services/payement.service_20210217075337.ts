import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { environment } from "../environment/environment";
import { ActionSheetController } from 'ionic-angular';
import {Http} from '@angular/http';
import { PayPal, PayPalPayment, PayPalConfiguration, PayPalPaymentDetails } from '@ionic-native/paypal';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Services } from '../services/services';



@Injectable()
export class PayementService{  
    private browser:any;
    private user:any;
    constructor(public alerCtrl: AlertController,
        public actionSheetCtrl: ActionSheetController,
        //private contactService: ContactService,
        private h:Http,
        private payPal: PayPal,
        private iab: InAppBrowser,
        private service: Services){
          this.service.daoGetgetUserInfo().then(user=>{
            this.user=user;

        });
        this.payPal.init({
          PayPalEnvironmentProduction: environment.clientidPaypalProduction,
          PayPalEnvironmentSandbox: environment.clientidPaypalSandbox
        });  
        }

        makepaypalpayment(datas,choix){
          console.log(datas.lemontant);
  
          this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
   
          })).then(() => {
            var paymentDetails = new PayPalPaymentDetails(datas.lemontant, "0.00", "0.00");
            let payment = new PayPalPayment(datas.lemontant, 'USD', 'credit de communication', 'sale', paymentDetails);
            this.payPal.renderSinglePaymentUI(payment).then(data => {
              let alert2 = this.alerCtrl.create();
              console.log(data.response.id);
              alert2.setMessage("Vérification du paiement");
              alert2.setTitle("paypal");
              alert2.present();
      
              if (data.response.state == "approved"){
              console.log("response id "+data.response.id);
              //valueOf()
              console.log("response idclient "+this.user.idClient);
              console.log("response url "+environment.paypalPayement + data.response.id + "/" + this.user.idClient);
              this.h.get("http://154.72.148.105:8081/Perfectpay/rest/api/paiement/checkPaypal?paymentId"+data.response.id
              +"&PayerID="+data.response.id+"&codeClient=" +environment.perfectPhone+"&codeApi="+environment.codeApi+
              "&Projet="+environment.projetPerfectPay+"&moyenTransaction=Paypal&compteClient="
              +"amount="+datas.lemontant)
  
                .map(resp => resp.json()).subscribe(resp=>{
                    switch(resp){
                      case 1:
                        alert2.setTitle("Opération effectuée avec succès" );
                        alert2.setMessage("Votre opération s'est déroulée avec sussès! Vous recevrez un message d'information.");
                      break;
                      case -1:
                      alert2.setMessage("échec de paiement. Veuillez réessayer");
                      break;
                      case -2:
                      alert2.setMessage("échec de paiement. Veuillez réessayer");
                      break;
                      case -3:
                      alert2.setMessage("Paiement déja validé");
                      break;
                      default:
                      alert2.setMessage("Echec: erreur rencontrée lors de la connexion avec le serveur. veuillez réessayer");
                      break
                    }
                    //if (data.status.toString() == "1")
                    //alert2.setTitle(data.status.toString());
                    //alert2.setMessage("paiement effectué avec success");
                  },error => {
                    //alert2.setTitle(error.status.toString());
                    alert2.setMessage("Erreur lors de la connexion avec le serveur");
                    // console.log(error.status);
                    //console.log(error.error); // error message as string
                    // console.log(error.headers);
                  });
                }else{
                  alert2.setMessage("Votre payement n'a pas été approuvé");
  
                }
      
            }, () => {
              // Error or render dialog closed without being successful
            });
          }, () => {
            // Error in configuration
          });
        }

        makePPpayment(userAgent,codeClient,montant,service) {
          let alert2 = this.alerCtrl.create();
          alert2.setMode('ios')
          alert2.showBackButton(false)
          alert2.setMessage("Opération en cours...");
          alert2.setTitle("chargement");
          alert2.present();

          let params="action=Initialiser_encaissement&Code_client="+userAgent+"&Service="+service+"&Montant="+montant;
          let link="https://" + environment.server + environment.apilink + params;

          this.h.get(link,{})
          .subscribe(data => {
            console.log(data.json()); 
            let result;
            try {
              result=data.json()
            } catch (error) {
              
            }

            switch(result.succes){
              case 1:
                alert2.setTitle("Opération effectuée avec succès" );
                alert2.setMessage("Votre recharge de "+montant+ " FCFA s'est déroulée avec succès! Vous recevrez un message d'information.");
              break;
              case -1:
              alert2.setMessage(result.msg);
              break;
              case -2:
              alert2.setMessage(result.msg);
              break;
              case -3:
              alert2.setMessage(result.msg);
              break;
              default:
              alert2.setMessage("Echec de l'opération!");
              break;
            }
          }, err => {
            console.log("Error");               
            alert2.setMessage("Echec: erreur rencontrée lors de la connexion avec le serveur. veuillez réessayer");

          })
 
        
        }
        makemtnpayment(datas,codeClient) {
        
          console.log(datas)
          let alert = this.alerCtrl.create();
          alert.setMode('ios')
          alert.setTitle("Paiement mobile MTN");
          //alert.setSubTitle("sous titre");
          alert.addInput({
            name: 'telephone',
            type: 'number',
            placeholder:"Numero de télephone"
          });
          alert.addButton({
            text: "Annuler",
            role: "cancel",
            
          })
      
          alert.addButton({
            text: "Payer",
            handler: data => {
              let alert2 = this.alerCtrl.create();
              alert.setMode('ios')
              alert.showBackButton(false)
              alert2.setMessage("Opération en cours...");
              alert2.setTitle("Payement");
              alert2.present();
              let link="http://" +"154.72.148.105"+":8081/Perfectpay/rest/api/paiement/mtn-money-recharge/"+data.telephone +"/" +
               datas.lemontant+ "/" +
               environment.perfectPhone+ "/" +
               environment.codeApi+ "/" +
               environment.projetPerfectPay+ "/MTN"+"/"+ codeClient;

              this.h.get(link,{})
              .subscribe(data => {
                console.log(data.json()); 
                let result;
                try {
                  result=data.json()
                } catch (error) {
                  
                }

                switch(result){
                  case 1:
                    alert2.setTitle("Opération effectuée avec succès" );
                    alert2.setMessage("Votre recharge de "+datas.lemontant+ " FCFA s'est déroulée avec succès! Vous recevrez un message d'information.");
                  break;
                  case -1:
                  alert2.setMessage("Echec de l'opération!");
                  break;
                  case'-2':
                  alert2.setMessage("échec de paiement. Veuillez réessayer");
                  break;
                  default:
                  alert2.setMessage("Echec de l'opération!");
                  break;
                }
              }, err => {
                console.log("Error");               
                alert2.setMessage("Echec: erreur rencontrée lors de la connexion avec le serveur. veuillez réessayer");

              })
     
            }
          });
         
          alert.present().then(() => {
            //this.testRadioOpen = true;
          });
        }
        makeOMPayment(datas,codeClient,telephone){
              let data= {
                return_url:"https://perfectpay.cm",
                 cancel_url:"https://perfectpay.cm", 
                 notif_url:"https://perfectpay.cm"
                        };  
                        
            let link="http://" +"154.72.148.105"+":8081/Perfectpay/rest/api/paiement/orange-money-recharge/"+telephone +"/" +
            datas.lemontant+ "/" +
            environment.perfectPhone+ "/" +
            environment.codeApi+ "/" +
            environment.projetPerfectPay+ "/ORANGE/"+telephone;
            this.h.post(link,data,{}).map(resp => resp.json()).subscribe(resp=>{
              console.log(resp)
            if (resp.status == "201") {

              
              this.browser = this.iab.create(resp.payment_url);
              this.browser.on('exit').subscribe(() => {
              this.verifyCreditPaymentStatus(resp.pay_token,datas,codeClient);
            }, err => {
              //console.log("error"+err);
            });
            }
            (err) => {
                let alert2 = this.alerCtrl.create();
                alert2.setMessage("Echec: erreur rencontrée lors de la connexion avec le serveur. veuillez réessayer" + console.error());
                alert2.present(); 
            }
          });
          
        }  

      verifyCreditPaymentStatus(pay_token:string,datas,codeClient){
        let link="http://" +"154.72.148.105"+":8081/Perfectpay/rest/api/paiement/getStatusRecharge/"+pay_token+"/" +codeClient

            
          this.h.post(link, datas, {}).map(resp => resp.json()).subscribe(resp=>{
            let alert3 = this.alerCtrl.create();
            alert3.setTitle("Infos");
            alert3.present();
            
              switch(resp){
              case "SUCCESS":
                alert3.setTitle("succès");

              alert3.setMessage("Opération effectuée  avec success! Vous recevrez un message de confirmation");
              break;

              case "FAILED":
              alert3.setMessage("échec de paiement. Veuillez réessayer");
              break;

              case "PENDING":
                this.verifyCreditPaymentStatus(pay_token,datas,codeClient)
              break;
              case "INITIATED":
                this.verifyCreditPaymentStatus(pay_token,datas,codeClient)
              break;
              case "EXPIRED":
                alert3.setMessage("échec de l'opération.");
                break;

              default:
              alert3.setMessage("échec de l'opération");
              break     
            } 
          });
          (err) => {
            let alert3 = this.alerCtrl.create();
            alert3.setMessage("Echec: erreur rencontrée lors de la connexion avec le serveur. veuillez réessayer"+ console.error());
          }

    }



  }

