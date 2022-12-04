import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GimacServices } from '../gimac-services/gimac-services';
import { LoginPage } from '../../login/login';



@Component({
  selector: 'page-gimac-topup',
  templateUrl: 'gimac-topup.html'
})
export class GimacTopupPage implements OnInit {
  formgroup: FormGroup; 
  private account: AbstractControl;
  private firstname: AbstractControl;
  private secondname: AbstractControl;
  private montant: AbstractControl;
  

  private message:any=""
  private user:any;
  transferInfo: any;
  private operateur="PerfectPay";
  private paysWallet=false
  private paysWallets=[];
  private advanced:boolean=false;


  selectOptions: { title: string; subTitle: string; mode: string; };
  wallets: any;
  selectOptions2 = {
    title: "selectionnez l'opérateur du destinataire",
    subTitle: 'Select operator',
    mode: 'ios'
  };
  wallet=null;

  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: GimacServices, 
    public loadingController: LoadingController) {

      this.formgroup = formbuilder.group({
        account: ['',Validators.required], 
        firstname: [''], 
        secondname: [''], 
        montant: ['', Validators.required],
      });
      this.account = this.formgroup.controls['account'];
      this.montant = this.formgroup.controls['montant'];
      this.firstname = this.formgroup.controls['firstname'];
      this.secondname = this.formgroup.controls['secondname'];

      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)
        }
        this.services.daoGetUser().then(user=>{
          this.user=user;
          console.log(user)
        })
  
       });


       this.selectOptions = {
        title: "selectionnez le pays",
        subTitle: 'Select the country',
        mode: 'ios'
      };


  }
 

  ngOnInit(): void {
    this.getGimacCountries()
  }


  getGimacCountries() {
    this.services.getGimacCountries().then((result: any) => {
      console.log(result)
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


  launchcheck(){
    
      this.checkTransfertMNO()
    
    
  }
  
  checkTransfertMNO() {

    this.message=""
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.transferInfo={
      firstname: this.firstname.value,
      secondname: this.secondname.value,
      PhoneOperateur: this.account.value,
      Montant:this.montant.value,   
      CodeClientExpediteur:this.user[0].Telephone,
      Operateur:this.wallet,
      intent: "mobile_reload"

    }
    console.log(this.transferInfo)
   
    
      this.services.checkEtopUP(this.transferInfo).then((result: any) => {
           //console.log(result)
        loading.dismiss();
        //console.log(result);
        switch (result.succes) {
          case 1:
            //console.log(result.resultat)
            this.handle(result)
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
      message: response.msg,
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
              this.makeEtopUp(this.transferInfo,data.secret_code)
            
           
          }
        }
      ]
    });
    alert.setMode("ios")
    alert.present()

    
  }

  makeEtopUp(transferInfo,secretCode) {
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.services.makeEtopUp(transferInfo,secretCode).then((result:any)=>{
      loading.dismiss()
      //console.log(result.resultat)
      let alert = this.alerCtrl.create();
     
      alert.setMode("ios");
      if(result){

        switch (result.succes) {
          case 1:
  
            alert.setTitle("Opération effectuée avec succès" );
           
            alert.setMessage(result.msg);
            alert.onDidDismiss(data=>{
              this.navCtrl.pop()
            })
                  
            break;                  
          default:
            this.message=result.msg
            alert.setMode("ios");
            alert.setMessage(result.msg);
            alert.setTitle("Echec de l'opération" );
            break;
        }
      }else{
        this.message="Erreur liée à votre transaction"
            alert.setMode("ios");
            alert.setMessage("Erreur liée à votre transaction");
            alert.setTitle("Echec de l'opération" );
      }

      alert.addButton("OK")
      alert.present();
      alert.onDidDismiss(data=>{
        this.navCtrl.pop()
      })


    })
  }


  makeTransfertBank(transferInfo,secretCode) {
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.services.makeTransfertBank(transferInfo,secretCode).then((result:any)=>{
      loading.dismiss()
      console.log(result.resultat)
      let alert = this.alerCtrl.create();
     
      alert.setMode("ios");

      switch (result.succes) {
        case 1:

          alert.setTitle("Opération effectuée avec succès" );
         
          alert.setMessage(result.msg);
          alert.onDidDismiss(data=>{
            this.navCtrl.pop()
          })
                
          break;                    
        default:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);
          alert.setTitle("Echec de l'opération" );
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
