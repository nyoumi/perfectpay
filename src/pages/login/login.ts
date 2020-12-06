import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Services } from '../../services/services';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
 

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  formgroup: FormGroup; 
  private email: AbstractControl;
  private password: AbstractControl;

  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: Services, 
    public loadingController: LoadingController) {
    this.formgroup = formbuilder.group({
      email: ['',Validators.compose([Validators.required, Validators.email])], 
      password: ['', Validators.required],
    });
    this.email = this.formgroup.controls['email'];
    this.password = this.formgroup.controls['password'];
    this.services.daoGetStatus().then(status=>{
      if(status==true){
        this.navCtrl.setRoot(HomePage)
      }

     });
  }

  login() {
    let loading = this.loadingController.create({ content: "Connexion"});
    loading.present();
    
      this.services.authentification( 
        this.email.value,
         this.password.value).then((result: any) => {
           console.log(result)
        loading.dismiss();
        //console.log(result);
        if(result.succes==1){
          this.services.daoSetStatus(true);
          this.services.daoSetUser(result.resultat)
          this.navCtrl.setRoot(HomePage);
      }else{
        if(result.succes==-2){
          let alert = this.alerCtrl.create();
          alert.setTitle("Erreur de connexion" );
          alert.setMode("ios");
          alert.setMessage(result.msg);
          alert.addButton("OK")
          alert.present();
        }else{
        let alert = this.alerCtrl.create();
        alert.setTitle("Erreur de connexion" );
        alert.setMode("ios");
        alert.setMessage("Login ou mot de passe incorrect");
        alert.addButton("OK")
        alert.present();

      }}
    });
  
  }
  gotoRegister(){
    this.navCtrl.setRoot(RegisterPage);

  }

}
