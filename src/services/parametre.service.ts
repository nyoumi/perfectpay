import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as localForage from "localforage";
import 'rxjs';
import 'rxjs/add/operator/map';
import { Services } from './services';


import { environment } from "../environment/environment";


@Injectable()
export class ParametreService {
    private user: any;
    private http: any;
    private devises: any; 
    private devise: any;


    constructor(
        private h: Http,
        private service: Services) {
        this.http = h;
        localForage.setDriver([localForage.WEBSQL, localForage.INDEXEDDB]);
        this.devises = {};
        this.devises["fcfa"] = "FCFA";
        this.devises["dollar"] = "DOLLAR";
        this.devises["euro"] ="EURO";
        this.devises["cad"] ="CAD";
        this.devises["cny"] ="YUAN";
        this.devises["gbp"] ="Livre sterling";
        this.devises["aed"] ="DIRHAM";
        this.devises["zar"] ="RAND";
        this.devises["ngn"] ="NAIRA";
        this.service.daoGetgetUserInfo().then(user => {
            this.user = user; 
        });

        //this.daoGetDefaultDevises().then((devises: any) => {
        //    this.devise=devises.find(x => x.statu == true); 
        //});
    }

    getDevise(){  
        //return this.devise;
    }

    getDevises(){
        return this.devises;
    }
    
      daoSetDefaultDevise(devises) {
        this.devise=devises.find(x => x.statu == true); 
        //console.log(this.devise);
        localForage.setItem('devise',devises);
      } 
    
      daoGetDefaultDevises() {
        return new Promise((resolve :any, reject: any) => resolve(localForage.getItem('devise', function (err, value) {  
        }))); 
        //devices.find(x => x.statu === true); 
      } 


      getOnlineDevises() {
        //var xml2js = require('xml2js');
        return new Promise(resolve => {
          this.http.get("http://" + environment.smsServer + "/rest/api/getDevises")
            .subscribe(data => {
              //console.log(data.json()); 
              localForage.setItem('onlineDevise',data.json());
              resolve(data.json());
            }, err => {
              //console.log("Error"); 
              localForage.getItem('onlineDevise', function (err, value) {  
                resolve(value);   
              })                           
            })
        });
      }

    /**
     * send credit to server
     */
    async  isAccountExist(receiverNumber) {
        let retour: any;
            return new Promise(resolve => {
                this.http.get("http://" + environment.smsServer + "/rest/api/isServiceExist/" + receiverNumber)
                    .subscribe(data => {
                        //console.log(data._body); 
                        resolve(data);
                    }, err => {
                        //console.log("Error: "+Error);
                        //console.log("Error"+err.toString);
                        resolve(-1);
                    })
            });
        
    }

    /**
     * send message to server
     */
    async  transfertCredit(receiverNumber,amount) {
        let senderId: string;
        senderId = this.user.name;
        senderId = senderId.substring(0, 10);
        console.log("http://" + environment.smsServer + "/rest/api/transfertCredit/" + this.user.idClient + "/" +amount + "/" + senderId + "/" + receiverNumber);
       // let dest = message.numeroDest.replace(/[\(\)\-\s]+/g, '');
        //console.log(dest.replace("+", ""));


        return new Promise(resolve => {
            this.http.get("http://" + environment.smsServer + "/rest/api/transfertCredit/" + this.user.idClient + "/" + receiverNumber + "/" + amount *10000)
                .subscribe(data => {
                    console.log(data._body); 
                    resolve(data._body);
                }, err => {
                    //console.log("Error: "+Error);
                    //console.log("Error"+err.toString);
                    resolve("error");
                })
        });
    }

    async  setDevise(devise) {   
        return new Promise(resolve => {
            this.http.get("http://" + environment.smsServer + "/rest/api/setDevise/" + this.user.idClient + "/" + devise)
                .subscribe(data => {
                    console.log(data._body); 
                    resolve(data._body);
                }, err => {
                    //console.log("Error: "+Error);
                    //console.log("Error"+err.toString);
                    resolve("error");
                })
        });
    }

    async  getOnlineDevisesByItem(devise) {   
        return new Promise(resolve => {
            this.http.get("http://" + environment.smsServer + "/rest/api/getOnlineDevises/"+ devise)
                .subscribe(data => {
                    //console.log(data.json()); 
                    resolve(data.json());
                }, err => { 
                    resolve("error");
                })
        });

    }

      
    formatNumber(dial_code, number) {
        number=number.replace(/[\(\)\-\s]+/g, '');
        if (number.substring(0, 1) === "+") number = number.substring(1, number.length);
        if (number.substring(0, 2) === "00") number = number.substring(2, number.length);
        console.log("code iso : "+dial_code); 
        console.log("number : "+number); 
        var prefix = number.substring(0, dial_code.length);
        if (dial_code == prefix) {
          return number.substring(dial_code.length,number.length);
        } else return number;
      }

}
