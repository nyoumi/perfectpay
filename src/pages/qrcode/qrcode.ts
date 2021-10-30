import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { QRCodeModule } from 'angularx-qrcode';
@Component({
  selector: 'page-qrcode', 
  templateUrl: 'qrcode.html'
})
export class QrcodePage {

  private message="";
  transferInfo: any;
private scanSub;
private amount;
private qrdata: string;
  telephone: any;



  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private socialSharing: SocialSharing,
    public alerCtrl: AlertController,
    public loadingController: LoadingController) {
      //this.qrdata=this.navParams.get("data");
      const datas=this.navParams.get("data");
      this.amount=datas.amount
      this.telephone=datas.amount
      
      this.qrdata=JSON.stringify(datas)
      console.log(this.qrdata)
     
      
  }

 
 
 
  share(){
    var canvas = document.getElementsByTagName('canvas')[0]  as HTMLCanvasElement;
    console.log(document.getElementsByTagName('canvas'))
    var dataURL = canvas.toDataURL();
    console.log(dataURL)
    this.socialSharing.share('Qr code de '+ this.telephone, 'QR CODE',dataURL ).then(() => {
      console.log("dddd")
    }).catch(( error)=> {
      console.log(error)
    });
  }

}
