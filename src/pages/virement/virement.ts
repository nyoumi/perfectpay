import { Component, ViewChild } from '@angular/core'; 
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Content } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'; 
import { Services} from "../../services/services";  

/**
 * Generated class for the VirementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-virement',
  templateUrl: 'virement.html',
})
export class VirementPage {
  @ViewChild(Content) content: Content;

  formgroup: FormGroup;
  mainPanel: boolean = true;
  private user:any;
  cPanel: boolean = false;
  private customerId: AbstractControl;
  private last4Digits: AbstractControl;
  private amount: AbstractControl;

  constructor(
    public navCtrl: NavController, 
    public formbuilder: FormBuilder,
    public services: Services,  
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    public alerCtrl:AlertController, 
    public navParams: NavParams) {
    this.formgroup = formbuilder.group({
      customerId: ['', Validators.required],
      last4Digits: ['', Validators.required],
      amount: ['', Validators.required]
    });
    this.customerId = this.formgroup.controls['customerId'];
    this.last4Digits = this.formgroup.controls['last4Digits'];
    this.amount = this.formgroup.controls['amount'];
    this.services.daoGetgetUserInfo().then(infos=>{
      this.user=infos; 
      console.log(this.user);
    });
  }

  communateur(){
    if(this.mainPanel){
       this.cPanel= true; 
       this.mainPanel= false; 
      }else{ 
       this.cPanel= false; 
       this.mainPanel= true; 
      }  
    this.content.resize();
  }

  virement() {
    let alert = this.alerCtrl.create();
   // alert.setTitle(this.translateService.instant('Virement.Vverscarte'));
   // alert.setMessage(this.translateService.instant('Virement.enterPwd1')+this.amount.value+this.translateService.instant('Virement.enterPwd2'));
    alert.addInput({
      type: 'password',
      name: 'password',
      placeholder:'password'
    }
    );
    alert.addButton("Annuler");
    alert.addButton({
      text:"consulter",
      handler: data => {
        console.log('Radio data:', data.password); 
        if(this.user.pass_word==data.password){
          let loading = this.loadingController.create({ content: "Virement en cours..."});
          loading.present();
          this.services.fundTransfertToCard(this.user.idClient,this.customerId.value,this.last4Digits.value,this.amount.value).then((result:any)=>{
            console.log('Resultat:', result); 
            loading.dismiss();
            let alert = this.alerCtrl.create();
            if(result=="0"){
              alert.setTitle("virement effectué avec succès");
              alert.setMessage("Votre virement s'est effectué avec succès"); 
            }  
            if(result=="-1"){ 
              alert.setTitle("Echec du virement");
              //alert.setMessage(this.translateService.instant('Virement.systemerror')); 
            }
            if(result=="-2"){ 
             // alert.setTitle(this.translateService.instant('Virement.echec'));
              //alert.setMessage(this.translateService.instant('Virement.infosIncorrect')); 
            }
            if(result=="-3"){ 
              //alert.setTitle(this.translateService.instant('Virement.echec'));
              //alert.setMessage(this.translateService.instant('Virement.soldeInsufisant')); 
            }
            //alert.addButton(this.translateService.instant('Virement.cancel'));
            alert.present().then(() => {
              //this.testRadioOpen = true;
            });
          }); 
        }else{
          //this.showErrorToast(this.translateService.instant('Virement.incorectpwd'));
        }
      }
    });
    alert.present().then(() => {
      //this.testRadioOpen = true;
    });
   }

   showErrorToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'middle'
    });
 
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VirementPage');
  }

}
