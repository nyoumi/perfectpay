import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder} from '@angular/forms';
import { Services } from '../../services/services';
import { LoginPage } from '../login/login';
import { CommissionsPage } from '../commissions/commissions';
import { HistoryPage } from '../history/history';


@Component({
  selector: 'page-point-vente',
  templateUrl: 'point-vente.html'
})
export class PointVentePage {
  private user:any;
  history: any=[];
  agentHistory: any=[];
  perfectPayHistory: any=[];
  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: Services, 
    public loadingController: LoadingController) {
      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)
        }
  
       });


      this.services.daoGetUser().then(user=>{
        this.user=user;
        this.getPointVente()

      })


 
  }
  getPointVente(){
  let loading = this.loadingController.create({ content: "Chargement de l'historique"});
  loading.present();
  this.services.getPointVente(this.user[0].Indexe).then((res:any)=>{
    console.log(res)
    loading.dismiss()
    if(typeof res === 'string'){
      console.log(res)
      //res=this.setCharAt(res,res.length-3,"")
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
    this.navCtrl.push(HistoryPage,{entry:entry}) 
  
  
}
}
