import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { GimacServices } from '../gimac-services/gimac-services';
import { LoginPage } from '../../login/login';

import { QRCodeModule } from 'angularx-qrcode';
@Component({
  selector: 'page-gimac-qrcode', 
  templateUrl: 'gimac-qrcode.html'
})
export class GimacQrcodePage {

  private message="";
  transferInfo: any;
private scanSub;
private amount;
  qrdata: string;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alerCtrl: AlertController,
    public services: GimacServices, 
    public loadingController: LoadingController) {
      const datas=this.navParams.get("data");
      this.amount=datas.montant
      console.log(datas)
      this.services.daoGetUser().then((user:any)=>{ 
        this.qrdata=JSON.stringify(
          { amount:  this.amount,
            telephone:datas.Telephone,
            codeClient:datas.CodeClient


          }
        );

        console.log(user.Telephone)
      })
      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)    
        }
  
       });
      
  }

 
 
  cancel(){
    
  }

}
