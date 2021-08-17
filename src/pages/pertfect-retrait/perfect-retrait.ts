import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Services } from '../../services/services';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-perfect-retrait',
  templateUrl: 'perfect-retrait.html'
})
export class PerfectRetraitPage {
  formgroup: FormGroup; 
  private code_point_vente: AbstractControl;
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
        code_point_vente: ['', Validators.required],
        montant: ['', Validators.required],
      });
      this.code_point_vente = this.formgroup.controls['code_point_vente'];
      this.montant = this.formgroup.controls['montant'];
      this.services.daoGetUser().then(user=>{
        this.user=user;
        console.log(user)
      })
  }

  checkRetrait() {

    this.message=""
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.transferInfo={
      code_point_vente: this.code_point_vente.value,
      Montant:this.montant.value,   
      CodeClientExpediteur:this.user[0].Telephone
    }
    
      this.services.checkRetrait(this.transferInfo).then((result: any) => {
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
      message: 'Vous êtes sur le point d\'effectuer le retrait suivant:<br/>'+
      'Point de Vente:<b>'+response.destinataire+'('+response.CodePointVente+')</b><br/>'+ 
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
            this.makeRetrait(this.transferInfo,data.secret_code)
          }
        }
      ]
    });
    alert.setMode("ios");
    alert.present()

    
  }
  /**
   * effectuer un retrait
   * @param transferInfo 
   * @param secretCode 
   */
  makeRetrait(transferInfo,secretCode) {
    let loading = this.loadingController.create({ content: "Traitement..."});
    loading.present();
    this.services.makeRetrait(transferInfo,secretCode).then((result:any)=>{
      loading.dismiss()
      console.log(result.resultat)
      let alert = this.alerCtrl.create();
      alert.setTitle("Echec de l'opération" );

      switch (result.succes) {
        case 1:

          alert.setTitle("Opération effectuée avec succès" );
          alert.setMode("ios");
          alert.setMessage(result.msg);
          alert.onDidDismiss(data=>{
            this.navCtrl.pop()
          })
      
          break;

        default:
          this.message=result.msg
          alert.setMode("ios");
          alert.setMessage(result.msg);
          break;
      }
      alert.addButton("OK")
      alert.present();



    })
  }

}
