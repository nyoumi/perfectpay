import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder} from '@angular/forms';
import { Services } from '../../services/services';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  private user:any;
  history: any=[];
  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: Services, 
    public loadingController: LoadingController) {
      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)
        }
  
       });
      let loading = this.loadingController.create({ content: "Chargement de l'historique"});
      loading.present();

      this.services.daoGetUser().then(user=>{
        this.user=user;
        this.services.getHistory(this.user[0].Indexe).then((res:any)=>{
          loading.dismiss()
          if(res.succes=1){
            this.history=res.resultat
    
          }
          
          console.log(res)
        })

      })


 
  }
  showEntry(entry){
    let alert = this.alerCtrl.create();
    alert.setTitle("Détails de l'opération");
    alert.setMode("ios")

    alert.setMode("ios");
alert.setMessage(
      "Date de l'opération: "+entry.DateTransaction+"<br/>"+
      "Heure de l'opération: "+entry.HeureTransaction+"<br/>"+
      "Montant de l'opération: "+entry.Montant+" FCFA<br/>"+
      "frais liés : "+entry.Frais+" FCFA<br/>"+
      "Reference de l'opération: "+entry.ReferenceArticle+"<br/>"+
      "Montant total de l'opération: <b>"+entry.MontantT+" FCFA</b><br/>"+
      "Telephone : "+entry.Telephone+"<br/>"+
      "Telephone Destinataire: "+entry.TelephoneDestinataire +"<br/>"+
      "Telephone de la Transaction: "+entry.TelephoneTransaction+"<br/>"

    );

    alert.present();
  }
  
  
}
