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
  codeClient: any;
  wallet: any;



  constructor(public navCtrl: NavController,
     public navParams: NavParams,
    private socialSharing: SocialSharing,
    public alerCtrl: AlertController,
    public loadingController: LoadingController) {
      //this.qrdata=this.navParams.get("data");
      const datas=this.navParams.get("data");
      this.amount=datas.montant
      this.telephone=datas.telephone
      this.codeClient=datas.codeClient
      this.wallet=datas.wallet
      
      this.qrdata=JSON.stringify(datas)
      console.log(this.qrdata)
      
  }

 
 
 
  share(){
    console.log(this.codeClient)
    console.log(this.telephone)
    console.log(this.amount)
    

    var canvas = document.getElementsByTagName('canvas')[0]  as HTMLCanvasElement;
    console.log(document.getElementsByTagName('canvas'))
    var dataURL = canvas.toDataURL();
    console.log(dataURL)
    this.socialSharing.share( "QR code de "+this.telephone, 'QR CODE',dataURL,"perfectpay.cm/payment/"+this.codeClient+"/"+this.amount+"/"+this.wallet ).then(() => {
      console.log("dddd")
    }).catch(( error)=> {
      console.log(error)
    });
  }

}
