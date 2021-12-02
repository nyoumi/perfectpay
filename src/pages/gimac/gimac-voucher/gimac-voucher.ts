import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GimacServices } from '../gimac-services/gimac-services';
import { LoginPage } from '../../login/login';
import { VoucherHistoryPage } from '../voucher-history/voucher-history';



@Component({
  selector: 'page-gimac-voucher',
  templateUrl: 'gimac-voucher.html'
})
export class GimacVoucherPage implements OnInit {
  formgroup: FormGroup; 
  private account: AbstractControl;
  private montant: AbstractControl;
  private validity: AbstractControl;

  
  

  private message:any=""
  private user:any;
  transferInfo: any;
  private operateur="PerfectPay";
  private paysWallet=false
  private paysBank=false
  private paysWallets=[];
  private paysBanks=[];
  private advanced:boolean=false;

  selectedSegment: any;
  showAll: boolean;
  showRead: boolean;
  showBank: boolean;
  showWallet: boolean=true;
  selectOptions: { title: string; subTitle: string; mode: string; };
  wallets: any;
  selectOptions2 = {
    title: "selectionnez le wallet du destinataire",
    subTitle: 'Select wallet',
    mode: 'ios'
  };
  wallet=null;

  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: GimacServices, 
    public loadingController: LoadingController) {
      this.selectedSegment = "showWallet"; 

      this.formgroup = formbuilder.group({
        account: ['',Validators.required], 
        montant: ['', Validators.compose([
          Validators.min(100),
          Validators.required,
        ])],
        validity:['0', Validators.required]
      });
      this.account = this.formgroup.controls['account'];
      this.montant = this.formgroup.controls['montant'];
      this.validity=this.formgroup.controls['validity'];

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
    this.getGimacBankCountries()
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
  getGimacBankCountries() {
    this.services.getGimacBankCountries().then((result: any) => {
      console.log(result)
   switch (result.succes) {
     case 1:
       console.log(result.resultat)
       this.paysBanks= result.resultat
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
  onChangeBank(event){
    let loading = this.loadingController.create({ content: "chargement...",enableBackdropDismiss:true});
    loading.present();
    this.services.getGimacBankWallets(event).then((result: any) => {
      loading.dismiss();
      console.log(result)
    
    //console.log(result);
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
      this.checkVoucher()
  }
  
  checkVoucher() {

    this.message=""
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.transferInfo={
      Code_clientDestinataire: this.account.value,
      Montant:this.montant.value,   
      CodeClientExpediteur:this.user[0].Telephone,
      WalletDestinataire:this.wallet

    }
    
      this.services.checkVoucher(this.transferInfo).then((result: any) => {
           console.log(result)
        loading.dismiss();
        //console.log(result);
        switch (result.succes) {
          case 1:
            console.log(result.resultat)
            this.handle(result)
            break;
                                  
          default:
            this.message=result.msg
            break;
        }
        if(!result.succes) this.message= "Echec de l'opération. Veuillez Réessayer!"

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
              this.makeVoucher(this.transferInfo,data.secret_code)
          }
        }
      ]
    });
    alert.setMode("ios")
    alert.present()

    
  }

  makeVoucher(transferInfo,secretCode) {
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.services.makeVoucher(transferInfo,secretCode).then((result:any)=>{
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

  onSegmentChanged(segmentButton: any) {
    this.wallet=null;
    this.selectedSegment = segmentButton; 
    segmentButton.value=="showBank"?this.showBank = true:this.showBank = false;
    segmentButton.value=="showWallet"?this.showWallet = true:this.showWallet = false;
    if( segmentButton.value!="showBank" && segmentButton.value!="showWallet") this.showBank = true

  }
 
  openVoucherHistory(){
    this.navCtrl.push(VoucherHistoryPage);
  }
}
