import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from 'ionic-angular';
import { GimacTransfertPage } from '../gimac-transfert/gimac-transfert';
import { GimacPaymentPage } from '../gimac-payment/gimac-payment';
import { HistoryPage } from '../gimac-history/gimac-history';
import { GimacPayementService } from '../gimac-services/gimac-payement.service';
import { GimacServices } from '../gimac-services/gimac-services';
import { LoginPage } from '../../login/login';
import { GimacVoucherPage } from '../gimac-voucher/gimac-voucher';


@Component({
  selector: 'page-home-gimac',
  templateUrl: 'home-gimac.html'
})
export class HomeGimacPage {
  private user: any;
  private testRadioOpen;
  private testRadioResult;

  constructor(public navCtrl: NavController,public menuCtrl: MenuController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,
    public services: GimacServices, 
    private toastCtrl: ToastController,
    private payementService:GimacPayementService,
    public loadingController: LoadingController) {
    this.services.daoGetUser().then(user=>{
      this.user=user;
      console.log(user)
    })
    this.services.daoGetStatus().then(status=>{
      if(status!=true){
        this.navCtrl.setRoot(LoginPage)
      }

     });
     this.menuCtrl.get().enable(true);

  }

  gotoTransfert(){
    this.navCtrl.push(GimacTransfertPage)
  }
  gotoPayment(){
    this.navCtrl.push(GimacPaymentPage)
  }
  gotoVoucher(){
    this.navCtrl.push(GimacVoucherPage)


  }

  
 
  doRadio(datatype) {
    let alert = this.alerCtrl.create();
    alert.setTitle("Moyen de paiement");
    alert.setSubTitle("Choisir un moyen de paiement pour recharger votre compte")
    alert.setMode("ios")



 

    alert.addInput({
      type: 'radio',
      label: 'Paypal',
      value: 'paypalPayment'
    });
    alert.addInput({
      type: 'radio', 
      label: 'MTN mobile money',
      value: 'MTNCredit'
    });
    alert.addInput({
      type: 'radio',
      label: 'Orange money',
      value: 'omCreditUssd'
    });
    alert.addInput({
      type: 'radio',
      label: 'Orange money (web)',
      value: 'omCredit'
    });

    alert.addButton("Annuler");
    alert.addButton({
      text: 'Ok',
      handler: data => {
       // console.log('Radio data:', data);
       if (data == "stripeCredit") {
        //this.navCtrl.push(StripePayment,{
         // param:datas.lemontant
        //});
        this.enterAmountByCard(data,datatype);
      }
        this.testRadioOpen = false;
        this.testRadioResult = data;
        if (data == "paypalPayment") {
          //this.payementService.makepaypalpayment(datatype);
          //this.makepaypalpayment(datas,datatype);
          this.enterAmountByCard(data,datatype);
        }

        if (data == "MTNCredit") {
          //this.makemtnpayment(datas);
          //this.payementService.makemtnpayment(datas);
          this.enterAmountByMobileMoney(data,datatype);
        }

        if (data == "omCredit" || data=="omCreditUssd") {
          //this.makeOMpayment();
          //this.makeOMPayment(datas,datatype);
          //this.payementService.makeOMPayment(datas,datatype);
          this.enterAmountByMobileMoney(data,datatype);
        }
        
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }


 
  makeBanking() {
    let alert = this.alerCtrl.create();
    alert.setTitle("Opération");
    alert.setSubTitle("Quelle opération souhaitez-vous effectuer?")
    alert.setMode("ios")



 

    alert.addInput({
      type: 'radio',
      label: 'Transfert vers une carte',
      value: 'paypalPayment'
    });
    alert.addInput({
      type: 'radio', 
      label: 'transfert vers compte bancaire',
      value: 'MTNCredit'
    });
    alert.addInput({
      type: 'radio',
      label: 'Transfert vers Orange Money',
      value: 'omCredit'
    });
    alert.addInput({
      type: 'radio',
      label: 'Transfert vers Mobile Money',
      value: 'omCredit'
    });

    alert.addButton("Annuler");
    alert.addButton({
      text: 'Ok',
      handler: data => {
        let alert = this.alerCtrl.create();
        alert.setTitle("Coming soon!");
        alert.setSubTitle("Bientôt disponible")
        alert.setMessage("Cette fonctionnalité sera bientôt disponible")
        alert.setMode("ios")
        alert.present()
  
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }
 /*  payMethod() { 
    let alert = this.alerCtrl.create();
    alert.setTitle("Méthode de paiement");

    alert.addInput({
      type: 'radio',
      label: 'Paypal',
      value: 'green',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'Credit card',
      value: 'blue'
    });

    alert.addInput({
      type: 'radio',
      label: 'Mobile money',
      value: 'green'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log('Radio data:------------------');
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });

    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  } */

  creditCard() {
    let alert = this.alerCtrl.create();
    alert.setTitle('Credit card');
    alert.setMode("ios")


    alert.addInput({
      type: 'input',
      placeholder: "Numéro de carte"
    });

    alert.addInput({
      type: 'input',
      placeholder:"Montant"
    }
    );

    alert.addButton({
      text: 'Buy',
      handler: data => {
        console.log('Radio data:', data);
        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

  enterAmountByCard(data,choix){
    let alert = this.alerCtrl.create();
    alert.setTitle("Montant");
    alert.setMode("ios")


    alert.addInput({
      type:'number',
      name:'lemontant',
      placeholder:"montant"
    });
    alert.addButton("Annuler");
    alert.addButton({
      text:'ok',
      handler:datas=>{
        if(datas.lemontant == ""){
          this.showErrorToast("veuillez remplir ce champs");
        }
        else{
          if(data == "stripeCredit"){
            this.navCtrl.push("StripePayment",{
              param:datas.lemontant,
              choix:choix
            });
          }
          if(data == "paypalPayment"){
            this.payementService.makepaypalpayment(datas,choix); 
          }
        }
    
      }
    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }
  enterAmountByMobileMoney(data,datatype){
    let alert = this.alerCtrl.create();
    alert.setTitle("Montant");
    alert.setMode("ios")


    alert.addInput({
      type:'number',
      name:'lemontant',
      placeholder:"Veuillez entrer le montant"
    });

    if(data == "omCreditUssd"){
            
      alert.addInput({
        type:'string',
        name:'compteOM',
        placeholder:"Numéro Orange Money à utiliser"
      });
    }
    alert.addButton("Annuler");
    alert.addButton({
      text:'ok',
      handler:datas=>{
        let codeClient=this.user[0].Telephone;
        if(datas.lemontant == "" ){
          this.showErrorToast("Veuillez saisir le montant");
        }
        if(datas.compteOM == "" ){
          this.showErrorToast("Veuillez saisir le numéro de téléphone à utiliser");
        }
        else{
          if(data == "MTNCredit"){
            this.payementService.makemtnpayment(datas,codeClient);
          }
          if(data == "omCredit"){
             
            this.payementService.makeOMPayment(datas,codeClient,this.user[0].Telephone);
          }
          if(data == "omCreditUssd"){
            
           this.payementService.makeOMUSSDPayment(datas,codeClient,this.user[0].Telephone,datas.compteOM);
         }
          
        }
      
      }

    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  }

  /**
   * affiche un toast d'erreur
   * @param data 
   */
  showErrorToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      dismissOnPageChange:true,
      cssClass:"toast-error",
      position: 'top',
    
    });
    
 
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  showSuccessToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      dismissOnPageChange:true,
      cssClass:"toast-success",
      position: 'top'
    });
    
 
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  ionViewDidEnter() {
    console.log("+++++++++++++++++++++++")
    this.services.daoGetUser().then(user=>{
      this.user=user;

    })


  }
  getHistorique(){
    let alert = this.alerCtrl.create();
    alert.setTitle("Contact");
    alert.setSubTitle("Besoin d'aide?")
    alert.setMessage("Contactez-nous par Tel: (Std) +237 (2) 33 52 00 02 / +237 (2) 33 52 00 03 <br>Email: info@kakotel.com")
    alert.setMode("ios")
    alert.present()


  }
 
}
