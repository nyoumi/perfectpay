import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GimacServices } from '../gimac-services/gimac-services';
import { LoginPage } from '../../login/login';

import { NgxQRCodeModule } from "ngx-qrcode2";
import { GimacScannerPage } from '../gimac-scanner/gimac-scanner';
@Component({
  selector: 'page-gimac-payment',
  templateUrl: 'gimac-payment.html'
})
export class GimacPaymentPage implements OnInit {
  @Input() open: EventEmitter<any> = new EventEmitter();


  formgroup: FormGroup; 
  private code_marchand: AbstractControl;
  private montant: AbstractControl;
  private message="";
  private user:any;
  transferInfo: any;
  private paysWallets=[{pays_id: '1', libelle_label: 'Cameroun'}];
  private defaultpaysWallet={pays_id: '1', libelle_label: 'Cameroun'}
  private paysWallet={pays_id: '1', libelle_label: 'Cameroun'}

  wallets: any;
 

  selectOptions: { title: string; subTitle: string; mode: string; };
  selectOptions2 = {
    title: "selectionnez type de marchand",
    subTitle: 'Select wallet',
    mode: 'ios'
  };
  wallet=null;

  constructor(public navCtrl: NavController,  public navParams: NavParams,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: GimacServices, 
    public loadingController: LoadingController) {
      this.services.scanner.subscribe(datas => {
        console.log(datas,"datas")
        datas=JSON.parse(datas)
        this.code_marchand.setValue(datas.codeClient)
        this.montant.setValue(datas.montant)

      });
     
      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)    
        }
  
       });
      this.formgroup = formbuilder.group({
        code_marchand: ['', Validators.required],
        montant: ['', Validators.required],
      });
      this.code_marchand = this.formgroup.controls['code_marchand'];
      this.montant = this.formgroup.controls['montant'];
      this.services.daoGetUser().then(user=>{
        this.user=user;
        console.log(user)
      })
      const datas=this.navParams.data
      if(datas){
        this.montant.setValue(datas.montant)
        this.code_marchand.setValue(datas.codeClient)
      }
      this.selectOptions = {
        title: "selectionnez le pays",
        subTitle: 'Select the country',
        mode: 'ios'
      };
  }
  ngOnInit(): void {
    this.getGimacMNOCountries()
  }
  getGimacMNOCountries() {
    this.services.getGimacMNOCountries().then((result: any) => {
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
    let loading = this.loadingController.create({ content: "Chargement...",enableBackdropDismiss:true});
    loading.present();
    this.services.getGimacMNOWallets(event).then((result: any) => {
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

                                  
          default:
            this.message=result.msg

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
   
  scanCode(){
   this.navCtrl.push(GimacScannerPage)
}
}
