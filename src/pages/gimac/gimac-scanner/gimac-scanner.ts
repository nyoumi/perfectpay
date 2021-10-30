import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController } from 'ionic-angular';
import { GimacServices } from '../gimac-services/gimac-services';
import { LoginPage } from '../../login/login';

import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner'; 
import { QRCodeModule } from 'angularx-qrcode';
@Component({
  selector: 'page-gimac-scanner',
  templateUrl: 'gimac-scanner.html'
})
export class GimacScannerPage {

  private message="";
  transferInfo: any;
private scanSub;
  camera: Boolean=true;



  constructor(public navCtrl: NavController, private qrScanner: QRScanner,
    public alerCtrl: AlertController,
    public services: GimacServices, 
    public loadingController: LoadingController) {
      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)    
        }
  
       });
      this.scanCode()
      
  }

 
 
  cancel(){
    this.scanSub.unsubscribe();

    this.qrScanner.hide();
    this.qrScanner.destroy()

    this.navCtrl.pop()
  }
  switch(){
    this.camera?this.qrScanner.useFrontCamera():this.qrScanner.useBackCamera();
    this.camera=!this.camera;
  }
  scanCode(){
    try {
      this.qrScanner.show()
    } catch (error) {
      console.log(error)
    }

    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
       if (status.authorized) {
         // camera permission was granted
   
  
         // start scanning
         this.qrScanner.show()
         let appRoot=document.getElementsByClassName("app-root")[0] as HTMLElement;
         appRoot.style.background="transparent"
         this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
          //let element= document.getElementById("cordova-plugin-qrscanner-video-preview");
          //element.style.zIndex="10000";
          //console.log( element.style.zIndex)
           console.log('Scanned something', text);
          // element.style.zIndex="-100";
          appRoot.style.background="#FFF"
           this.qrScanner.hide(); // hide camera preview
           this.scanSub.unsubscribe(); // stop scanning
           let alert = this.alerCtrl.create({
            title: 'Qr code',
            message: text,
           
            
          });
          alert.present()
         });
  
       } else if (status.denied) {
        let alert = this.alerCtrl.create({
          title: 'Qr code',
          message: "Vous devez autoriser l'utilisation de la caméra afin de permettre la lecture des CODES QR",
         
          
        });
        alert.present()
         // camera permission was permanently denied
         // you must use QRScanner.openSettings() method to guide the user to the settings page
         // then they can grant the permission from there
       } else {
         // permission was denied, but not permanently. You can ask for permission again at a later time.
       }
    })
    .catch((e: any) =>{
      console.log('Error is', e)
      let alert = this.alerCtrl.create({
        title: 'Qr code',
        message: e,
       
        
      });
      alert.present()
    } 

    )}
}
