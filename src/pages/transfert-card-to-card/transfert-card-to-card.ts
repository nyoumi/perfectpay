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
  selector: 'page-transfert-card-to-card',
  templateUrl: 'transfert-card-to-card.html',
})
export class TransfertCardToCardPage {
  @ViewChild(Content) content: Content;

  formgroup: FormGroup; 
  private user:any;
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

  virement() {
    let alert = this.alerCtrl.create();
    alert.setTitle("virement vers carte");
    alert.setMessage("Veuillez entrer votre mot de passe pour autoriser le virement de : "+this.amount.value+" FCFA dans la carte.");
    alert.addInput({
      type: 'password',
      name: 'password',
      placeholder:" Mot de passe"
    }
    );
    alert.addButton("Annuler");
    alert.addButton({
      text:" Virer de l'argent depuis votre compte",
      handler: data => {
        console.log('Radio data:', data.password); 
        if(this.user.pass_word==data.password){
          let loading = this.loadingController.create({ content:" Virement en cours..."});
          loading.present();
          this.services.fundTransfertCardToCard(this.user.idClient,this.customerId.value,this.last4Digits.value,this.amount.value).then((result:any)=>{
            console.log('Resultat:', result); 
            loading.dismiss();
            let alert = this.alerCtrl.create();
            if(result=="0"){
              alert.setTitle("Succès");
              alert.setMessage("Virement éffectué avec succès."); 
            }  
            if(result=="-1"){ 
              alert.setTitle("Echec");
              alert.setMessage("Le système a rencontré un problème lors du virement. Veuillez réessayer plus tard."); 
            }
            if(result=="-2"){ 
              alert.setTitle("Echec");
              alert.setMessage("Les informations de virement sont incorrects. Veuillez les vérifier et réessayer"); 
            }
            if(result=="-3"){ 
              alert.setTitle("Echec");
              alert.setMessage("Votre solde est insufisant pour éffectuer ce virement. Veuillez recharger votre compte Perfect pay et réessayer"); 
            }
            if(result=="-4"){ 
              alert.setTitle("Echec");
              alert.setMessage("this.translateService.instant('VirementCardToCard.missedId')"); 
            }
            alert.addButton("Annuler");
            alert.present().then(() => {
              //this.testRadioOpen = true;
            });
          }); 
        }else{
          this.showErrorToast("Le mot de passe entré est incorrect");
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

