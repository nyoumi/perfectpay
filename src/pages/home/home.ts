import { Component } from '@angular/core';
import { Services } from '../../services/services';
import { FormBuilder } from '@angular/forms';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from 'ionic-angular';
import { PerfectTransfertPage } from '../pertfect-transfert/perfect-transfert';
import { PerfectPaymentPage } from '../pertfect-payment/perfect-payment';
import { PayementService } from '../../services/payement.service';
import { HistoryPage } from '../history/history';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private user: any;
  private testRadioOpen;
  private testRadioResult;

  constructor(public navCtrl: NavController,public menuCtrl: MenuController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,
    public services: Services, 
    private toastCtrl: ToastController,
    private payementService:PayementService,
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
  getSolde(){
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
                let alert = this.alerCtrl.create();
                alert.setTitle("Erreur d'authentifcation" );
                alert.setMode("ios");
                alert.setMessage("le code secret que vous avez saisi est incorrecte");
                alert.addButton("OK")
                alert.present();
                alert.setMode("ios")
                return ;
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
                }else{
                let alert = this.alerCtrl.create();
                alert.setTitle("Erreur de vérification" );
                alert.setMode("ios");
                alert.setMessage("Erreur de verification veuillez réessayer plus tard");
                alert.addButton("OK")
                alert.present();
                alert.setMode("ios")

                return; 
              }


            })
          }
        }
      ]
    });

    
    alert.present();
    alert.setMode("ios")

    
  }
  gotoTransfert(){
    this.navCtrl.push(PerfectTransfertPage)
  }
  gotoPayment(){
    this.navCtrl.push(PerfectPaymentPage)
  }
  getHistory(){
    this.navCtrl.push(HistoryPage)


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

        if (data == "omCredit") {
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
    alert.addButton("Annuler");
    alert.addButton({
      text:'ok',
      handler:datas=>{
        let codeClient=this.user[0].Telephone;
        if(datas.lemontant == ""){
          this.showErrorToast("Veuillez saisir le montant");
        }
        else{
          if(data == "MTNCredit"){
            this.payementService.makemtnpayment(datas,codeClient);
          }
          if(data == "omCredit"){
             -
            this.payementService.makeOMPayment(datas,codeClient,this.user[0].Telephone);
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
      if(this.user)
      this.services.checkSecret(this.user[0].Indexe).then((result:any)=>{
        console.log(result)
        if (result.succes==1) {
          this.createSecret()
        } else {
          if(result.succes==-1 || result.succes==0){
            this.services.disconnect()
            this.navCtrl.setRoot(LoginPage)
          }
          if (result.succes==2) {
           this.services.daoSetHaveUsed(true)
          }
        }
      })
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
  createSecret(){
    let alert = this.alerCtrl.create({

      enableBackdropDismiss:false
    });
    alert.setTitle("Code secret");
    alert.setSubTitle("Veuillez définir votre code secret")
    alert.setMessage("votre code secret vous permet de sécuriser vos opération PerfectPay. Vous devez donc le conserver de manière confidentielle!")
    alert.setMode("ios")


    alert.addInput({
      type:'password',
      name:'secret',
      placeholder:"123456"
    });
    alert.addInput({
      type:'password',
      name:'secretConfirm',
      placeholder:"123456"
    });
    alert.addButton({
      text:'ok',
      handler:datas=>{
        let codeClient=this.user[0].Indexe;
        if(!datas.secret){
          this.createSecret()
          this.showErrorToast("Veuillez saisir Votre code secret");
          return ;
        }
        if(datas.secret != datas.secretConfirm ){
          this.showErrorToast("Les codes que vous avez saisi ne sont pas identiques");
          this.createSecret()
          return;
        }
        
    this.services.createSecret(codeClient,datas.secret).then((result:any)=>{
      if (result.succes==1) {
        let alert2= this.alerCtrl.create();
        alert2.setTitle("Succès de l'opération");
        alert2.setSubTitle("Code secret Enregistré avec succès")
        alert2.setMessage("Ce code secret vous sera demandé lors de vos opérations PerfectPay. ")
        alert2.setMode("ios")
        alert2.present()
    
      } else {
        let alert2= this.alerCtrl.create();
        alert2.setTitle("Echec de l'enregistrement");
        alert2.setSubTitle("Code secret non définit!")
        alert2.setMessage("Une erreur s'est produite lors de l'enregistrement de votre code secret ")
        alert2.setMode("ios")
        alert2.present()
      }
    })

      
      }

    });
    alert.present()
  


  }
}
