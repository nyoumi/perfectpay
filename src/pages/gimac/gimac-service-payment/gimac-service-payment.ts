import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GimacServices } from '../gimac-services/gimac-services';
import { LoginPage } from '../../login/login';

import { LoaderController } from '../../../app/LoaderController';
import { AlertInputOptions } from 'ionic-angular/umd/components/alert/alert-options';
@Component({
  selector: 'page-gimac-service-payment',
  templateUrl: 'gimac-service-payment.html'
})
export class GimacServicePaymentPage implements OnInit {
  @Input() open: EventEmitter<any> = new EventEmitter();


  formgroup: FormGroup; 
  private reference_abonne: AbstractControl;
  private reference_abonnement: AbstractControl;
  private reference_facture:AbstractControl;
  private message="";
  private user:any;
  transferInfo: any;
  private paysWallets=[{pays_id: '1', libelle_label: 'Cameroun'}];
  private defaultpaysWallet={pays_id: '1', libelle_label: 'Cameroun'}
  private paysWallet={pays_id: '1', libelle_label: 'Cameroun'}

  wallets:any[] =[];
 

  selectOptions: { title: string; subTitle: string; mode: string; };
  selectOptions2 = {
    title: "selectionnez le service",
    subTitle: 'Select wallet',
    mode: 'ios'
  };
  wallet=null;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: GimacServices, 
    public loadingController: LoaderController) {
   
     
      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)    
        }
  
       });
      this.formgroup = formbuilder.group({
        reference_abonnement: ['', Validators.required],
        reference_abonne: [''],
        reference_facture:['']
      });
      this.reference_abonnement = this.formgroup.controls['reference_abonnement'];
      this.reference_abonne = this.formgroup.controls['reference_abonne'];
      this.reference_facture = this.formgroup.controls['reference_facture'];

      
      this.services.daoGetUser().then(user=>{
        this.user=user;
        console.log(user)
      })
      
      this.selectOptions = {
        title: "selectionnez le pays",
        subTitle: 'Select the country',
        mode: 'ios'
      };
  }
  ngOnInit(): void {
    this.getGimacCountries()
    this.onChangeWallet(this.paysWallet.pays_id)
  }
  getGimacCountries() {
    this.services.getGimacCountries().then((result: any) => {
      console.log(result)
    
    //console.log(result);
    switch (result.succes) {
     case 1:
       console.log(result.resultat)
       this.paysWallets=result.resultat;
       
       break;
                             
     default:
       this.message=result.msg
       break;
    }
    
    });
  }
  onChangeWallet(event){
    console.log(event)
    let loading = this.loadingController.create({ content: "Chargement...",enableBackdropDismiss:false});
    loading.present();
    
    this.services.getGimacBillers(event).then((result: any) => {
      loading.dismiss();
      console.log(result)
        switch (result.succes) {
     case 1:
       console.log(result.resultat)
       this.wallets=result.resultat;
       break;                  
     default:
       this.message=result.msg
       break;
    }
    
    });

  }

   inquiryBills() {

    this.message=""
    let loading = this.loadingController.create({ content: "Traitement...",enableBackdropDismiss:false});
    loading.present();
    this.transferInfo={
      Service: this.wallets.find(({ code_walet }) => code_walet === this.wallet).service,
      ReferenceAbonnement:this.reference_abonnement.value,   
      ReferenceAbonne:this.reference_abonne.value, 
      ReferenceFacture:this.reference_facture.value,
      CodeClientExpediteur:this.user[0].Telephone,
      CodeBiller:this.wallet
    }
    this.handle({});
    
     /*  this.services.billsInquiry(this.transferInfo).then((result: any) => {
        console.log(result)
        loading.dismiss();
        //console.log(result);
        switch (result.succes) {
          case 1:
            this.handle(result.billList)
            break;

                                  
          default:
            this.message=result.msg

            break;
        }

    }); */
  
  }

  checkPayment() {

    this.message=""
    let loading = this.loadingController.create({ content: "Traitement...",enableBackdropDismiss:false});
    loading.present();
   
    
      this.services.checkServicePayment(this.transferInfo).then((result: any) => {
           console.log(result)
        loading.dismiss();
        //console.log(result);
        switch (result.succes) {
          case 1:
            this.handlePaiement(result)
            break;

                                  
          default:
            this.message=result.msg

            break;
        }

    });
  
  }

  handlePaiement(result){
    let alert = this.alerCtrl.create({
      title: 'Confirmation',
      subTitle:"Enter your secret code",
      message: result.msg,
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
    alert.setMode("ios")
    alert.present()

    
  }

  handle( response){
   let factures:AlertInputOptions[]=[];
   response='[{"billRef":"2500 - 300RWF(1 day)-##7166999731850603770","createTime":1670015318506,"dueTime":1670015318506,"dueAmount":300.0,"currency":"950","status":"U"},{"billRef":"2500 - 1,200RWF(1 week)-##7166999731850603770",'
   +'"createTime":1670015318506,"dueTime":1670015318506,"dueAmount":1200.0,"currency":"950","status":"U"},{"billRef":"2500 - 3,500RWF(1 month)-##7166999731850603770","createTime":1670015318506,"dueTime":1670015318506,'
   +'"dueAmount":3500.0,"currency":"950","status":"U"},{"billRef":"4500 - 300RWF(1 day)-##7166999731850603770","createTime":1670015318506,"dueTime":1670015318506,"dueAmount":300.0,"currency":"950","status":"U"},'
   +'{"billRef":"4500 - 1,200RWF(1 week)-##7166999731850603770","createTime":1670015318506,"dueTime":1670015318506,"dueAmount":1200.0,"currency":"950","status":"U"},{"billRef":"4500 - 3,500RWF(1 month)-##7166999731850603770"'
   +',"createTime":1670015318506,"dueTime":1670015318506,"dueAmount":3500.0,"currency":"950","status":"U"}]';
   
   response=JSON.parse(response);
   let message="";
    for (let index = 0; index < response.length; index++) {
      const element = response[index];
      factures.push({name:element.billRef,label:"Facture "+(index+1), type:"checkbox",id: element.billRef,value:element
    }
    )
    
    message= message+"<div class=\"facture\">"+(index+1)+" : Reférence: "+element.billRef+"<br> Montant: "+element.dueAmount+"<br> Date: "+new Date(element.createTime).toLocaleString(["En","Fr"], { day:"2-digit",month:"short",year:"numeric"})+"</div><br>"
      
    }
    let alert = this.alerCtrl.create({
      title: 'Selectionnez les factures à payer',
      message: message,
      inputs: factures,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          
        },
        {
          text: 'Valider',
          handler: data => {
            console.log(data)

            let amount=0;
            let facture="";
            for (let index = 0; index < data.length; index++) {
              const element = data[index];
              amount=amount+element.dueAmount;
              facture=facture+element.billRef+","
            }
           
            
            this.transferInfo.Montant=amount;
            this.transferInfo.facture=facture.replace(/.$/,"")
            this.transferInfo.intent="bill_payment";
            this.transferInfo.factures=data;

            console.log(facture)
            this.checkPayment( )
          }
        }
      ],
      cssClass:"factures"
    });
    alert.setMode("ios")
    alert.present()

    
  }
  makePayment(transferInfo,secretCode) {
    let loading = this.loadingController.create({ content: "Traitement...",enableBackdropDismiss:false});
    loading.present();
    this.services.makeServicePayment(transferInfo,secretCode).then((result:any)=>{
      loading.dismiss()
      console.log(result.resultat)
      let alert = this.alerCtrl.create();
      alert.setTitle("Echec de l'opération" );
      alert.setMode("ios")


      switch (result.succes) {
        case 1:

          alert.setTitle("Opération effectuée avec succès" );
          alert.setMessage(result.msg);
      
          break;
        default:
          this.message=result.msg
          alert.setMessage(result.msg);
          break;
      }
      alert.addButton("OK")
      alert.present();
      alert.onDidDismiss(data=>{
        this.navCtrl.pop()
      })
    })
  }
   
}
