import { Component } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from 'ionic-angular';
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
  user: any;

  constructor(public navCtrl: NavController,public menuCtrl: MenuController,
    private toastCtrl: ToastController,
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
    // this.menuCtrl.get().enable(false);
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
          this.user=result.resultat
          this.services.daoSetStatus(true);
          this.services.daoSetUser(result.resultat)
          this.services.getSecretStatus(result.resultat[0].Indexe).then((status:any)=>{
            console.log(status)
            if(status.succes==1){
              this.createSecret()
             
            }else{
              this.navCtrl.setRoot(HomePage);
            }
          })
         
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
        alert.setMessage(result.msg);
        alert.addButton("OK")
        alert.present();

      }}
    },err=>{
      let alert = this.alerCtrl.create();
      alert.setTitle("Erreur de connexion" );
      alert.setMode("ios");
      alert.setMessage("erreur de connexion au serveur");
      alert.addButton("OK")
      alert.present();
    });
  
  }
  gotoRegister(){
    this.navCtrl.setRoot(RegisterPage);

  }

  createSecret(){
    let alert = this.alerCtrl.create({

      enableBackdropDismiss:false
    });
    alert.setTitle("Code secret");
    alert.setSubTitle("Veuillez définir votre code secret")
    alert.setMessage("votre code secret vous permet de sécuriser vos opération PerfectPay. Vous devez donc le conserver de manière confidentielle!")
    alert.setMode("ios")



    alert.addInput({
      type:'password',
      name:'secret',
      placeholder:"123456"
    });
    alert.addInput({
      type:'password',
      name:'secretConfirm',
      placeholder:"123456"
    });
    alert.addButton({
      text:'ok',

      handler:datas=>{
        let codeClient=this.user[0].Indexe;
        if(!datas.secret){
          this.showErrorToast("Veuillez saisir Votre code secret");
          this.createSecret()
          return ;
        }
        if(datas.secret != datas.secretConfirm ){
          this.showErrorToast("Les codes que vous avez saisi ne sont pas identiques");
          this.createSecret()
          return;
        }
        
    this.services.createSecret(codeClient,datas.secret).then((result:any)=>{
      if (result.succes==1) {
        let alert2= this.alerCtrl.create();
        alert2.setTitle("Succès de l'opération");
        alert2.setSubTitle("Code secret Enregistré avec succès")
        alert2.setMessage("Ce code secret vous sera demandé lors de vos opérations PerfectPay. ")
        alert2.setMode("ios")
        alert2.present()
    
      } else {
        let alert2= this.alerCtrl.create({

          enableBackdropDismiss:false
        });
        alert2.setTitle("Echec de l'enregistrement");
        alert2.setSubTitle("Code secret non défini!")
        alert2.setMessage("Une erreur s'est produite lors de l'enregistrement de votre code secret ")
        alert2.setMode("ios")
        alert2.present()
      }
    })

      
      }

    });
    alert.present()

  


  }

  
  /**
   * affiche un toast d'erreur
   * @param data 
   */
  showErrorToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      dismissOnPageChange:true,
      cssClass:"toast-error",
      position: 'top',
    
    });
    
 
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
