import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Services } from '../../services/services';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-perfect-payment',
  templateUrl: 'perfect-payment.html'
})
export class PerfectPaymentPage {
  formgroup: FormGroup; 
  private code_marchand: AbstractControl;
  private montant: AbstractControl;
  private message="";
  private user:any;
  transferInfo: any;
  mServices=[{id:1,nom:"défaut"},{id:2,nom:"bar"},{id:3,nom:"facture erp"}];
  private testRadioOpen;
  private testRadioResult;
  service={id:1,nom:"défaut"};


  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,private params: NavParams,
    public formbuilder: FormBuilder,public services: Services, 
    public loadingController: LoadingController) {
      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)
          return;
        }
  
       });
      this.formgroup = formbuilder.group({
        montant: ['', Validators.required], 
      });
      this.services.daoGetMerchantServices().then(services=>{
        this.mServices=services
      })
      this.code_marchand = this.formgroup.controls['code_marchand'];
      this.montant = this.formgroup.controls['montant'];
      let loading = this.loadingController.create({ content: "Chargement ..."});
      loading.present();
      this.services.daoGetUser().then(user=>{
        this.user=user;
        console.log(user)

      })



   
  }

  checkPayment() {

    this.message=""
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.transferInfo={
      Code_marchand: this.code_marchand.value,
      Montant:this.montant.value,   
      CodeClientExpediteur:this.user[0].Telephone
    }
    
      this.services.checkPayment(this.transferInfo).then((result: any) => {
           console.log(result)
        loading.dismiss();
        //console.log(result);
        switch (result.succes) {
          case 1:
            console.log(result.resultat)
            this.handle(result.resultat[0])
            break;
          case -1:
            this.message=result.msg
            
            break;
          case -2:
            this.message=result.msg

            break;
          case -3:
            this.message=result.msg

            break;
          case -4:
            this.message=result.msg

            break;
          case -5:
            
            this.message=result.msg

            break;
          case -6:
            this.message=result.msg

            break;

          case -7:
            this.message=result.msg

            break;
          case -8:
            this.message=result.msg

            break;
          case -9:
            this.message=result.msg

            break;
          case 0:
            this.message=result.msg

            break;

                                  
          default:
            break;
        }

    });
  
  }
  handle( response){
    let alert = this.alerCtrl.create({
      title: 'Confirmation',
      message: 'Vous êtes sur le point d\'effectuer le paiement suivant:<br/>'+
      'Marchand:<b>'+response.NomMarchand+'</b><br/>'+ 
      'Montant:<b>'+response.Montant+' FCFA</b><br/>'+
      'Frais:<b>'+response.Frais+' FCFA</b><br/>'+ 
      'Montant Total:<b>'+response.MonantNet+' FCFA</b><br/>'+ 
      '<b>Veuillez entrer votre code secret pour confirmer</b>',
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
            console.log(data.secret_code)
            this.makePayment(this.transferInfo,data.secret_code)
          }
        }
      ]
    });
    alert.present()

    
  }
  makePayment(transferInfo,secretCode) {
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.services.makePayment(transferInfo,secretCode).then((result:any)=>{
      loading.dismiss()
      console.log(result.resultat)
      let alert = this.alerCtrl.create();
      alert.setTitle("Echec de l'opération" );

      switch (result.succes) {
        case 1:

          alert.setTitle("Opération effectuée avec succès" );
          alert.setMode("ios");
          alert.setMessage("Votre opération s'est déroulée avec sussès! Vous recevrez un message d'information.");
      
          break;
        case -1:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);

          
          break;
        case -2:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);


          break;
        case -3:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);


          break;
        case -4:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);


          break;
        case -5:
          
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);


          break;
        case -6:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);


          break;

        case -7:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);


          break;
        case -8:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);


          break;
        case -9:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);


          break;
        case -10:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);
          break;    

        default:
          break;
      }
      alert.addButton("OK")
      alert.present();
      alert.onDidDismiss(data=>{
        this.navCtrl.pop()
      })


    })
  }


  doRadio(datatype) {
    let alert = this.alerCtrl.create();
    alert.setTitle("Moyen de paiement");
    alert.setSubTitle("Choisir le moyen de paiement du client")
    alert.setMode("ios")
    alert.addInput({
      type: 'radio',
      label: 'PerfectPay',
      value: 'perfectpayPayment'
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
    alert.addInput({
      type: 'radio',
      label: 'Paypal',
      value: 'paypalPayment'
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
         // this.enterAmountByMobileMoney(data,datatype);
        }

        if (data == "omCredit") {
          //this.makeOMpayment();
          //this.makeOMPayment(datas,datatype);
          //this.payementService.makeOMPayment(datas,datatype);
          //this.enterAmountByMobileMoney(data,datatype);
        }
        if (data == "perfectpayPayment") {
          //this.makeOMpayment();
          //this.makeOMPayment(datas,datatype);
          //this.payementService.makeOMPayment(datas,datatype);
         // this.enterAmountByMobileMoney(data,datatype);
        }
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
         // this.showErrorToast("veuillez remplir ce champs");
        }
        else{
          if(data == "stripeCredit"){
            this.navCtrl.push("StripePayment",{
              param:datas.lemontant,
              choix:choix
            });
          }
          if(data == "paypalPayment"){
           // this.payementService.makepaypalpayment(datas,choix); 
          }
        }
    
      }
    });
    alert.present().then(() => {
     // this.testRadioOpen = true;
    });
  }
/*   enterAmountByMobileMoney(data,datatype){
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
         // this.showErrorToast("Veuillez saisir le montant");
        }
        else{
          if(data == "MTNCredit"){
            //this.payementService.makemtnpayment(datas,codeClient);
          }
          if(data == "omCredit"){
             -
           // this.payementService.makeOMPayment(datas,codeClient,this.user[0].Telephone);
          }
        }
      
      }

    });
    alert.present().then(() => {
      this.testRadioOpen = true;
    });
  } */

}
