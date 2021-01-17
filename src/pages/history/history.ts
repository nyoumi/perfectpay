import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
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
  agentHistory: any=[];
  perfectPayHistory: any=[];
  type="tout"
  entry: any;
 ;
  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController, navParams: NavParams,
    public formbuilder: FormBuilder,public services: Services, 
    public loadingController: LoadingController) {
      this.entry=navParams.get('entry');
      console.log(this.entry)

      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)
        }
  
       });


      this.services.daoGetUser().then(user=>{
        this.user=user;
        if(this.entry){
          this.getpointVenteHistory(this.entry)

        }else{
          this.getHistory()
         // this.getAgentHistory()
          //this.getPerfectPayHistory()
        }
   
     

      })


 
  }
getHistory(){
  let loading = this.loadingController.create({ content: "Chargement de l'historique"});
  loading.present();
  this.services.getHistory(this.user[0].Indexe).then((res:any)=>{
    console.log(res)
    loading.dismiss()
    if(typeof res === 'string'){
      console.log(res)
      res=this.setCharAt(res,res.length-3,"")
      res=JSON.parse(res)
    }
    if(res.succes==1){
      if(res.resultat)
      this.history=res.resultat
      for (let index = 0; index < this.history.length; index++) {
        const element = this.history[index];
        if(element.TelephoneExpediteur){
          element.usager=element.TelephoneExpediteur
        }else{
          element.usager=element.TelephoneDesinataire
        }

        if(element.NomExpediteur){
          element.nomUsager=element.NomExpediteur
        }else{
          element.nomUsager=element.NomDesinataire
        }

      }

    }
    
    console.log(res)
  })
}

getpointVenteHistory(indexpdv){
  let loading = this.loadingController.create({ content: "Chargement de l'historique"});
  loading.present();
  this.services.getTransactionsPointVente(this.user[0].Indexe,indexpdv.Indexe).then((res:any)=>{
    console.log(res)
    loading.dismiss()
    if(typeof res === 'string'){
      console.log(res)
      res=this.setCharAt(res,res.length-3,"")
      res=JSON.parse(res)
    }
    if(res.succes==1){
      if(res.resultat)
      this.history=res.resultat
      for (let index = 0; index < this.history.length; index++) {
        const element = this.history[index];
        if(element.TelephoneExpediteur){
          element.usager=element.TelephoneExpediteur
        }else{
          if(element.TelephoneDesinataire)element.usager=element.TelephoneDesinataire
          
          if(element.Telephone)element.usager=element.Telephone

        }

        if(element.NomExpediteur){
          element.nomUsager=element.NomExpediteur
        }else{
          element.nomUsager=element.NomDesinataire
          if(element.nomUsager)element.Provenance
        }

      }

    }
    
    console.log(res)
  })
}

getAgentHistory(){
  let loading = this.loadingController.create({ content: "Chargement de l'historique"});
  loading.present();
  this.services.getHistoryPointVente(this.user[0].Indexe).then((res:any)=>{
    console.log(res)
    loading.dismiss()
    if(typeof res === 'string'){
      console.log(res)
      res=this.setCharAt(res,res.length-3,"")
      res=JSON.parse(res)
    }
    if(res.succes==1){
      if(res.resultat)
      this.agentHistory=res.resultat
      for (let index = 0; index < this.agentHistory.length; index++) {
        const element = this.agentHistory[index];
        if(element.TelephoneExpediteur){
          element.usager=element.TelephoneExpediteur
        }else{
          element.usager=element.TelephoneDesinataire
        }

        if(element.NomExpediteur){
          element.nomUsager=element.NomExpediteur
        }else{
          element.nomUsager=element.NomDesinataire
        }

      }

    }
    
    console.log(res)
  })
}

getPerfectPayHistory(){
  let loading = this.loadingController.create({ content: "Chargement de l'historique"});
  loading.present();
  this.services.getHistoryPerfectPay(this.user[0].Indexe).then((res:any)=>{
    console.log(res)
    loading.dismiss()
    if(typeof res === 'string'){
      console.log(res)
      res=this.setCharAt(res,res.length-3,"")
      res=JSON.parse(res)
    }
    if(res.succes==1){
      if(res.resultat)
      this.perfectPayHistory=res.resultat
      for (let index = 0; index < this.perfectPayHistory.length; index++) {
        const element = this.perfectPayHistory[index];
        if(element.TelephoneExpediteur){
          element.usager=element.TelephoneExpediteur
        }else{
          element.usager=element.TelephoneDesinataire
        }

        if(element.NomExpediteur){
          element.nomUsager=element.NomExpediteur
        }else{
          element.nomUsager=element.NomDesinataire
        }

      }

    }
    
    console.log(res)
  })
}
  setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}
  showEntry(entry){
    let alert = this.alerCtrl.create();
    alert.setTitle("Détails de l'opération");
    alert.setMode("ios")

    alert.setMode("ios");
alert.setMessage(
  "Reference de l'opération: "+entry.IDTransaction+"<br/>"+
      "Date et heure: "+entry.Date+"<br/>"+
      "Montant: <b>"+entry.Montant+" FCFA</b><br/>"+
      "Type de transaction : "+entry.TypeTrasaction+"<br/>"+
      "Nom de l'expéditeur : "+entry.nomUsager+"<br/>"+
      "Telephone Expédieteur: "+entry.usager +"<br/>"
    );

    alert.present();
  }
  
  
}
