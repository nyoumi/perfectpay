import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder} from '@angular/forms';
import { LoginPage } from '../login/login';
import { Services } from '../../services/services';


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
@IonicPage(
  {
    name: 'NotificationPage' 
  }
  )
export class NotificationPage {
  private user:any;
  private notifications:Array<any>=[  
    {
      "titre":"Tranfert entrant",
      "message": "vous evez reçu un montant de 5000Fcfa de 696844889 le 12/12/2021 à 15h. IDTransaction: re147d5d85c8f ",
      "page":"HistoryPage",
      "date":"18/12/2021 12:30",
      "status":"unread",
      "id":"1"
    },
    {
      "titre":"Tranfert entrant",
      "message": "le 12/12/2021 à 15h. IDTransaction: re147d5d85c8f ",
      "page":"HistoryPage",
      "date":"18/12/2021 12:30",
      "status":"unread",
      "id":"2"
    },
    {
      "titre":"Tranfert entrant",
      "message": "vous evez reçu un montant de 5000Fcfa de 696844889 le 12/12/2021 à 15h. IDTransaction: re147d5d85c8f ",
      "page":"HistoryPage",
      "date":"18/12/2021 12:30",
      "status":"unread",
      "id":"3"
    },
    {
      "titre":"Tranfert entrant",
      "message": "vous evez reçu un montant de 5000Fcfa de 696844889 le 12/12/2021 à 15h. IDTransaction: re147d5d85c8f ",
      "page":"HistoryPage",
      "date":"18/12/2021 12:30",
      "status":"read",
      "id":"4"
    },
  ];
  unread: any=0;
  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: Services, public alertCtrl: AlertController,
    public loadingController: LoadingController) {
      this.services.daoGetStatus().then(status=>{
        if(status!=true){
          this.navCtrl.setRoot(LoginPage)
        }
  
       });
       this.services.daoGetNotifications().then((notifications:any)=>{
        console.log(notifications);
        console.log( this.notifications);

        if(notifications && notifications.length){
          console.log(notifications.length)
          this.notifications=notifications;
          console.log( this.notifications);
        }
        this.notifications.forEach(notifcation => {
          if(notifcation.status=="unread"){
            this.unread++;
          }
            
        });
        this.notifications=this.notifications.filter(notif=>{
          return notif.status=="unread";
        })
        
      })

 
  }
  deleteEntry(entry){
    const confirm = this.alertCtrl.create({
      title: 'Supprimer la notification?',
      mode:"ios",
      message: 'Êtes-vous sûr de vouloir supprimer cette notification?',
      buttons: [
        {
          text: 'cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.deletenotif(entry.id)
          }
        }
      ]
    });
    confirm.present();

  
  
}
deletenotif(id){
  this.notifications=this.notifications.filter(function (el) {
    return el.id!=id;
  })
  this.services.daoDeleteNotification(id);

}
}
