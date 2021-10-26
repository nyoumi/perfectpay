import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder} from '@angular/forms';
import { GimacServices } from '../gimac-services/gimac-services';
import { LoginPage } from '../../login/login';


@Component({
  selector: 'page-voucher-history',
  templateUrl: 'voucher-history.html'
})
export class VoucherHistoryPage {
  private user:any;
  private voucher={DateTransaction:"12/10/2021",HeureTransaction:"12h30",Montant:1000,Libelle:"message texte"}
  history: any=[];
  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: GimacServices, 
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
    let message;
    switch (entry.TypeTrasaction) {
      case "4":
        message= "Date de la transaction: "+entry.DateTransaction+"<br/>"+
        "Heure de la transaction: "+entry.HeureTransaction+"<br/>"+
        "Id de la transaction: " +entry.IDTransaction+"<br/>"+
        "Type de transaction: "+entry.Libelle+"<br/>"+
        "Montant de la transaction: "+entry.Montant+" FCFA<br/>"+
        "Frais de la transaction: "+entry.Frais+" FCFA<br/>"+
        "Montant total de la transaction: <b>"+entry.MontantT+" FCFA</b>"+
        "Telephone de la Transaction: "+entry.TelephoneTransaction+"<br/>"

        
        break;
        case "3":
          message= "Date de la transaction: "+entry.DateTransaction+"<br/>"+
          "Heure de la transaction: "+entry.HeureTransaction+"<br/>"+
          "Id de la transaction: " +entry.IDTransaction+"<br/>"+
          "Type de transaction: "+entry.Libelle+"<br/>"+
          "Montant de la transaction: "+entry.Montant+" FCFA<br/>"+
          "Frais de la transaction: "+entry.Frais+" FCFA<br/>"+
          "Montant total de la transaction: <b>"+entry.MontantT+" FCFA</b>"
          
          break;
          case "6":
            message= "Date de la transaction: "+entry.DateTransaction+"<br/>"+
            "Heure de la transaction: "+entry.HeureTransaction+"<br/>"+
            "Id de la transaction: " +entry.IDTransaction+"<br/>"+
            "Type de transaction: "+entry.Libelle+"<br/>"+
            "Montant de la transaction: "+entry.Montant+" FCFA<br/>"+
            "Frais de la transaction: "+entry.Frais+" FCFA<br/>"+
            "Montant total de la transaction: <b>"+entry.MontantT+" FCFA</b>"
            "Motif de la transaction: <b>"+entry.MotifTransaction+" FCFA</b>"

            
            break;
            case "2":
              message= "Date de la transaction: "+entry.DateTransaction+"<br/>"+
              "Heure de la transaction: "+entry.HeureTransaction+"<br/>"+
              "Id de la transaction: " +entry.IDTransaction+"<br/>"+
              "Type de transaction: "+entry.Libelle+"<br/>"+
              "Montant de la transaction: "+entry.Montant+" FCFA<br/>"+
              "Telephone de la Transaction: "+entry.TelephoneTransaction+"<br/>"

  
              
              break;
              case "5":
                message= "Date de la transaction: "+entry.DateTransaction+"<br/>"+
                "Heure de la transaction: "+entry.HeureTransaction+"<br/>"+
                "Id de la transaction: " +entry.IDTransaction+"<br/>"+
                "Type de transaction: "+entry.Libelle+"<br/>"+
                "Montant de la transaction: "+entry.Montant+" FCFA<br/>"+
                "Nom du marchand: "+entry.NomMarchand+" <br/>"+
                "Telephone du marchand: "+entry.TelephoneMarchand+"<br/>"+
                "Code du marchand: "+entry.CodeApi+"<br/>"

  
    
                
                break;
                case "1":
                  if(entry.Initiateur=="NON"){
                    message= "Date de la transaction: "+entry.DateTransaction+"<br/>"+
                    "Heure de la transaction: "+entry.HeureTransaction+"<br/>"+
                    "Id de la transaction: " +entry.IDTransaction+"<br/>"+
                    "Motif de la transaction: "+entry.MotifTransaction+" </br>"+
                    "Type de transaction: "+entry.Libelle+"<br/>"+
                    "Montant de la transaction: "+entry.Montant+" FCFA<br/>"+
                    "Expéditeur: "+entry.Expediteur+" <br/>"+
                    "Telephone de l'expédieteur: "+entry.TelephoneExpediteur+"<br/>" ;
                  }else{
                    message= "Date de la transaction: "+entry.DateTransaction+"<br/>"+
                    "Heure de la transaction: "+entry.HeureTransaction+"<br/>"+
                    "Id de la transaction: " +entry.IDTransaction+"<br/>"+
                     "Motif de la transaction: "+entry.MotifTransaction+" </br>"+
                    "Type de transaction: "+entry.Libelle+"<br/>"+
                    "Montant de la transaction: "+entry.Montant+" FCFA<br/>"+
                    "Frais de la transaction: "+entry.Frais+" FCFA<br/>"+
                    "Montant total de la transaction: "+entry.MontantT+" FCFA</br>"+
                    "Nom du destinataire: "+entry.Destinataire+"<br/>"+
                    "Téléphone du destinataire: "+entry.TelephoneDestinataire+"<br/>";

                  }

                  break;
    
      default:
        message=""
        break;
    }

    alert.setMessage(message)

    alert.present();
    alert.addButton("OK");
  }
  
  
}
