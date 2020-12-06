import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import {  ParametreService } from '../../services/parametre.service';

/**
 * Generated class for the ExchangeRatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exchange-rate',
  templateUrl: 'exchange-rate.html',
})
export class ExchangeRatePage {
  public marge_devise: any;
  public onlineDevises: any;
  public devises: any; 
  public devise: any;
  public d: any;
  public devisesCopy: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController, public parametreService: ParametreService) {
    this.parametreService.daoGetDefaultDevises().then((devises: any) => {
      if (devises){
        this.devises = devises; 
        this.devise=devises.find(x => x.statu == true); 
      }else{ 
        this.devises=[{ devise: "FCFA",
        statu: false
        },{  devise: "DOLLAR",
          statu: true
        },{ devise: "EURO",
          statu: false
        },{ devise: "CAD",
        statu: false
        },{ devise: "YUAN",
          statu: false
        },{ devise: "Livre sterling",
        statu: false
        },{ devise: "DIRHAM",
        statu: false
        },{ devise: "RAND",
        statu: false
        },{ devise: "NAIRA",
        statu: false
        }];  
        this.devise={  devise: "DOLLAR", statu: true};
      }
      let loading = this.loadingController.create({ content: "..."});
      loading.present();
      this.parametreService.getOnlineDevisesByItem(this.devise.devise).then(result => {
        //console.log("devises....."+result);
        loading.dismiss();
        this.onlineDevises= result;
        this.customDevises(); 
      });   
      
    }); 

    this.parametreService.getOnlineDevises().then((marge_devise: any) => { 
      this.marge_devise=marge_devise;  
    });

  }

  initialiozeDevisesCopy(){
    this.devisesCopy=[{ devise: "FCFA",
    statu: false
    },{  devise: "DOLLAR",
      statu: true
    },{ devise: "EURO",
      statu: false
    },{ devise: "CAD",
    statu: false
    },{ devise: "YUAN",
      statu: false
    },{ devise: "Livre sterling",
    statu: false
    },{ devise: "DIRHAM",
    statu: false
    },{ devise: "RAND",
    statu: false
    },{ devise: "NAIRA",
    statu: false
    }]; 
  }   

  customDevises(){
    this.initialiozeDevisesCopy();
    if(this.devise.devise=="DOLLAR"){
      this.devisesCopy.splice(1, 1);
      this.devisesCopy[0].statu =this.onlineDevises.USDXOF;  
      this.devisesCopy[1].statu =this.onlineDevises.USDEUR;
      this.devisesCopy[2].statu =this.onlineDevises.USDCAD;
      this.devisesCopy[3].statu =this.onlineDevises.USDCNY;
      this.devisesCopy[4].statu =this.onlineDevises.USDGBP;
      this.devisesCopy[5].statu =this.onlineDevises.USDAED;
      this.devisesCopy[6].statu =this.onlineDevises.USDZAR; 
      this.devisesCopy[7].statu =this.onlineDevises.USDNGN; 
    } 
    
    if(this.devise.devise=="FCFA"){
      this.devisesCopy.splice(0, 1);
      this.devisesCopy[0].statu =this.onlineDevises.XOFUSD;
      this.devisesCopy[1].statu =this.onlineDevises.XOFEUR;
      this.devisesCopy[2].statu =this.onlineDevises.XOFCAD;
      this.devisesCopy[3].statu =this.onlineDevises.XOFCNY;
      this.devisesCopy[4].statu =this.onlineDevises.XOFGBP;
      this.devisesCopy[5].statu =this.onlineDevises.XOFAED;
      this.devisesCopy[6].statu =this.onlineDevises.XOFZAR;
      this.devisesCopy[7].statu =this.onlineDevises.XOFNGN;
    } 

    if(this.devise.devise=="EURO"){
      this.devisesCopy.splice(2, 1);
      this.devisesCopy[0].statu =this.onlineDevises.EURXOF;
      this.devisesCopy[1].statu =this.onlineDevises.EURUSD;
      this.devisesCopy[2].statu =this.onlineDevises.EURCAD;
      this.devisesCopy[3].statu =this.onlineDevises.EURCNY;
      this.devisesCopy[4].statu =this.onlineDevises.EURGBP;
      this.devisesCopy[5].statu =this.onlineDevises.EURAED;
      this.devisesCopy[6].statu =this.onlineDevises.EURZAR;
      this.devisesCopy[7].statu =this.onlineDevises.EURNGN;
    } 

    if(this.devise.devise=="CAD"){
      this.devisesCopy.splice(3, 1);
      this.devisesCopy[0].statu =this.onlineDevises.CADXOF;
      this.devisesCopy[1].statu =this.onlineDevises.CADUSD;
      this.devisesCopy[2].statu =this.onlineDevises.CADEUR;
      this.devisesCopy[3].statu =this.onlineDevises.CADCNY;
      this.devisesCopy[4].statu =this.onlineDevises.CADGBP;
      this.devisesCopy[5].statu =this.onlineDevises.CADAED;
      this.devisesCopy[6].statu =this.onlineDevises.CADZAR;
      this.devisesCopy[7].statu =this.onlineDevises.CADNGN;
    } 

    if(this.devise.devise=="YUAN"){
      this.devisesCopy.splice(4, 1);
      this.devisesCopy[0].statu =this.onlineDevises.CNYXOF;
      this.devisesCopy[1].statu =this.onlineDevises.CNYUSD;
      this.devisesCopy[2].statu =this.onlineDevises.CNYEUR;
      this.devisesCopy[3].statu =this.onlineDevises.CNYCAD;
      this.devisesCopy[4].statu =this.onlineDevises.CNYGBP;
      this.devisesCopy[5].statu =this.onlineDevises.CNYAED;
      this.devisesCopy[6].statu =this.onlineDevises.CNYZAR;
      this.devisesCopy[7].statu =this.onlineDevises.CNYNGN;
    } 

    if(this.devise.devise=="Livre sterling"){
      this.devisesCopy.splice(5, 1);
      this.devisesCopy[0].statu =this.onlineDevises.GBPXOF;
      this.devisesCopy[1].statu =this.onlineDevises.GBPUSD;
      this.devisesCopy[2].statu =this.onlineDevises.GBPEUR;
      this.devisesCopy[3].statu =this.onlineDevises.GBPCAD;
      this.devisesCopy[4].statu =this.onlineDevises.GBPCNY;
      this.devisesCopy[5].statu =this.onlineDevises.GBPAED;
      this.devisesCopy[6].statu =this.onlineDevises.GBPZAR;
      this.devisesCopy[7].statu =this.onlineDevises.GBPNGN;
    } 

    if(this.devise.devise=="DIRHAM"){
      this.devisesCopy.splice(6, 1);
      this.devisesCopy[0].statu =this.onlineDevises.AEDXOF;
      this.devisesCopy[1].statu =this.onlineDevises.AEDUSD;
      this.devisesCopy[2].statu =this.onlineDevises.AEDEUR;
      this.devisesCopy[3].statu =this.onlineDevises.AEDCAD;
      this.devisesCopy[4].statu =this.onlineDevises.AEDCNY;
      this.devisesCopy[5].statu =this.onlineDevises.AEDGBP;
      this.devisesCopy[6].statu =this.onlineDevises.AEDZAR;
      this.devisesCopy[7].statu =this.onlineDevises.AEDNGN;
    } 

    if(this.devise.devise=="RAND"){
      this.devisesCopy.splice(7, 1);
      this.devisesCopy[0].statu =this.onlineDevises.ZARXOF;
      this.devisesCopy[1].statu =this.onlineDevises.ZARUSD;
      this.devisesCopy[2].statu =this.onlineDevises.ZAREUR;
      this.devisesCopy[3].statu =this.onlineDevises.ZARCAD;
      this.devisesCopy[4].statu =this.onlineDevises.ZARCNY;
      this.devisesCopy[5].statu =this.onlineDevises.ZARGBP;
      this.devisesCopy[6].statu =this.onlineDevises.ZARAED;
      this.devisesCopy[7].statu =this.onlineDevises.ZARNGN;
    } 

    if(this.devise.devise=="NAIRA"){
      this.devisesCopy.splice(8, 1);
      this.devisesCopy[0].statu =this.onlineDevises.NGNXOF;
      this.devisesCopy[1].statu =this.onlineDevises.NGNUSD;
      this.devisesCopy[2].statu =this.onlineDevises.NGNEUR;
      this.devisesCopy[3].statu =this.onlineDevises.NGNCAD;
      this.devisesCopy[4].statu =this.onlineDevises.NGNCNY;
      this.devisesCopy[5].statu =this.onlineDevises.NGNGBP;
      this.devisesCopy[6].statu =this.onlineDevises.NGNAED;
      this.devisesCopy[7].statu =this.onlineDevises.NGNZAR;
    } 
  }

  countryChange(){  
    let loading = this.loadingController.create({ content: "..."});
    loading.present();
    this.devise=this.d;
    this.parametreService.getOnlineDevisesByItem(this.d.devise).then(result => {
      //console.log("devises....."+result);
      loading.dismiss();
      this.onlineDevises= result;
      console.log(this.devisesCopy);
      this.customDevises();
    });  
    //this.formgroup.controls['dial_code'].setValue(this.country.dial_code);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExchangeRatePage');
  }

}
