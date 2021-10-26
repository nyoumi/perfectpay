import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { GimacServices } from '../gimac-services/gimac-services';
import { LoginPage } from '../../login/login';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';


@Component({
  selector: 'page-gimac-payment',
  templateUrl: 'gimac-payment.html'
})
export class GimacPaymentPage {
  formgroup: FormGroup; 
  private code_marchand: AbstractControl;
  private montant: AbstractControl;
  private message="";
  private user:any;
  transferInfo: any;



  constructor(public navCtrl: NavController,private qrScanner: QRScanner,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: GimacServices, 
    public loadingController: LoadingController) {
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
  scanCode(){
    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted


       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);
         let alert = this.alerCtrl.create({
          title: 'code scanner',
          message: text,
          buttons: [
            {
              text: 'Annuler',
              role: 'cancel',
              
            }
          ]
        });
        alert.present()

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
      let alert = this.alerCtrl.create({
        title: 'code scanner',
        message: "camera permission was permanently denied",
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            
          }
        ]
      });
      alert.present()
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
     } else {
      let alert = this.alerCtrl.create({
        title: 'code scanner',
        message: " permission was denied, but not permanently. You can ask for permission again at a later time",
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            
          }
        ]
      });
      alert.present()
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
  }
}
