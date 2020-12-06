import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Services } from '../../services/services';
import { LoginPage } from '../login/login';



@Component({
  selector: 'page-perfect-transfert',
  templateUrl: 'perfect-transfert.html'
})
export class PerfectTransfertPage {
  formgroup: FormGroup; 
  private account: AbstractControl;
  private raison: AbstractControl;
  private montant: AbstractControl;
  

  private message:any=""
  private user:any;
  transferInfo: any;

  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: Services, 
    public loadingController: LoadingController) {
      this.formgroup = formbuilder.group({
        account: ['',Validators.required], 
        raison: ['', Validators.required],
        montant: ['', Validators.required],
      });
      this.account = this.formgroup.controls['account'];
      this.raison = this.formgroup.controls['raison'];
      this.montant = this.formgroup.controls['montant'];

      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)
        }
        this.services.daoGetUser().then(user=>{
          this.user=user;
          console.log(user)
        })
  
       });

  }

  checkTransfert() {

    this.message=""
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.transferInfo={
      account: this.account.value,
      raison:this.raison.value,
      montant:this.montant.value,   
      CodeClientExpediteur:this.user[0].Telephone
    }
    
      this.services.checkTransfert(this.transferInfo).then((result: any) => {
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
          case -10:
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
      message: 'Vous êtes sur le point d\'effectuer la transaction suivante:<br/>'+
      'Destinataire:<b>'+response.destinataire+'</b><br/>'+ 
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
            this.makeTransfert(this.transferInfo,data.secret_code)
          }
        }
      ]
    });
    alert.present()

    
  }
  makeTransfert(transferInfo,secretCode) {
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.services.makeTransfert(transferInfo,secretCode).then((result:any)=>{
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

}
