import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Services } from '../../services/services';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-perfect-payment',
  templateUrl: 'perfect-payment.html'
})
export class PerfectPaymentPage {
  formgroup: FormGroup; 
  private phone_dest: AbstractControl;
  private montant: AbstractControl;
  private message="";
  private user:any;
  transferInfo: any;



  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: Services, 
    public loadingController: LoadingController) {
      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)
        }
  
       });
      this.formgroup = formbuilder.group({
        phone_dest: ['', Validators.required],
        montant: ['', Validators.required],
      });
    
      this.services.daoGetUser().then(user=>{
        this.user=user;
        console.log(user)
      })
  }

  checkPayment() {
    this.phone_dest = this.formgroup.controls['phone_dest'].value;
    this.montant = this.formgroup.controls['montant'].value;

    this.handle( this.phone_dest,this.montant)
  
  }
  handle( phone_dest,montant){
    let alert = this.alerCtrl.create({
      title: 'Confirmation',
      message: 'Vous êtes sur le point d\'effectuer le retrait :<br/>'+
      'Montant:<b>'+montant+' FCFA</b><br/>'+
      'telephone:<b>'+phone_dest+' FCFA</b><br/>',
      
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
            this.makePayment(montant,phone_dest,data.secret_code)
          }
        }
      ]
    });
    alert.present()

    
  }
  makePayment(montant,phone_dest,secret_code) {
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    let transfertInfo={
      "phoneagent":"237"+this.user[0].Telephone,
      "phonedestinataire":phone_dest,
      "montant":montant,
      "codesecret":secret_code
    }
    this.services.makeRetrait(transfertInfo).then((result:any)=>{
      loading.dismiss()
      console.log(result.resultat)
      let alert = this.alerCtrl.create();
      alert.setTitle("Echec de l'opération" );

      switch (result.succes) {
        case 1:

          alert.setTitle("Opération effectuée avec succès" );
          alert.setMode("ios");
          alert.setMessage(result.msg);
      
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
