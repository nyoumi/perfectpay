import { Injectable } from "@angular/core";
import * as localForage from "localforage";
import { Http, Headers } from '@angular/http';
import 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from "../environment/environment";

const  REGISTERED="REGISTERED";
const  HAVE_USED="HAVEUSED";


const  VALUE_REGISTERED=2;
const  VALUE_HAVE_USED=1;
const  VALUE_FIRST_USE=0;

const  ACTUAL_VERSION_VALUE=10;
const  APP_LINK="http://play.google.com/store/apps/details?id=cm.iplans.call";

   
const  MINVERSION="MINVERSION";
const MERCHANT_SERVICES="MERCHANT_SERVICES";


@Injectable()
export class Services {


 
  private http: any;
  private user: any;
  private status: any; 
  private transferInfos:any;


  constructor(private h: Http) {
    this.http = h;
    localForage.setDriver([localForage.WEBSQL, localForage.INDEXEDDB]);
    this.saveAndroidMinVersion().then((result:any)=>{
      if(!isNaN(result))
      this.daoSetMinVersion(result);
      console.log(result);
      console.log(ACTUAL_VERSION_VALUE);
    });
  }
 
  authentification(email, password) {
    //var xml2js = require('xml2js');
    let params="action=login_account_marchand&login="+email+"&password="+password;
    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apilink + params)
        .subscribe(data => {
          console.log(data.json()); 
          resolve(data.json());
        }, err => {
          console.log("Error"); 
          resolve(err);
        })
    });
  }

  register(UserInfo) {

    let params="action=create_account_update&Nom="+UserInfo.nom+"&Prenom="+UserInfo.Prenom+
    "&Email="+UserInfo.email+"&Telephone="+UserInfo.Telephone+"&Pays="+UserInfo.Pays+"&Ville="+UserInfo.Ville;
    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apilink + params)
        .subscribe(data => {
          console.log(data.json()); 
          resolve(data.json());
        }, err => {
          console.log("Error");    
          resolve(err);
        })
    });
  }
   getRegions() {
    let action="action=show_liste_region";
    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apilink+action)
        .subscribe(data => {
          console.log(data.json()); 
          resolve(data.json());
        }, err => {
          console.log("Error");    
          resolve(err);
        })
    });
  } 
  getDepartments() {
    let action="action=show_liste_departement";
    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apilink+action)
        .subscribe(data => {
          console.log(data.json()); 
          resolve(data.json());
        }, err => {
          console.log("Error");    
          resolve(err);
        })
    });
  } 

    getSoldeClient(idClient,secretCode) {
      let action="action=check_solde";

    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apilink+action+"&indexe_users="+idClient+"&secret_code="+secretCode)
        .subscribe(data => {
          //console.log(data._body); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve(err);
        })
    });
  }
  getHistory(idClient,idService) {
    let action="action=View_liste_encaissements_services";

  return new Promise(resolve => {
    this.http.get("https://" + environment.server +environment.apilink+action+ "&indexe_users="+idClient+"&IndexeService="+idService)
      .subscribe(data => {
        //console.log(data._body); 
        //data=JSON.stringify(data).slice(0, -3)
        //console.log(data); 
        resolve(data.json());
      }, err => {
        //console.log("Error"); 
        resolve(err);
      })
  });
}
getMerchantServices(idClient) {
  let action="action=View_liste_services";

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+action+"&indexe_users="+idClient)
    .subscribe(data => {
      //console.log(data._body); 
      resolve(data._body);
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}
  checkTransfert(transferInfos) {
    this.transferInfos=transferInfos;
    let link="action=check_informations_account_perfect_pay&CodeClient="+environment.perfectPhone+
    "&CodeAPI="+environment.codeApi+"&Projet=PERFECTPAY&Code_clientExpediteur="+transferInfos.CodeClientExpediteur+"&Code_clientDestinataire="+
    transferInfos.account+"&Montant="+transferInfos.montant+"&Raison_transfert="+transferInfos.raison;

  return new Promise(resolve => {
    this.http.get("https://" + environment.server + environment.apilink+link)
      .subscribe(data => {
        //console.log(data._body); 
        let result=-1;
        try {
          result=data.json()
        } catch (error) {
          
        }
        resolve(result);
      }, err => {
        //console.log("Error"); 
        resolve(err);
      })
  });
}
makeTransfert(transferInfos,secretCode) {  
  let link="action=transfert_account_perfect_pay&CodeClient="+environment.perfectPhone+
  "&CodeAPI="+environment.codeApi+"&Projet="+ environment.projetPerfectPay+"&Code_clientExpediteur="+transferInfos.CodeClientExpediteur+"&Code_clientDestinataire="+
  transferInfos.account+"&Montant="+transferInfos.montant+"&Raison_transfert="+transferInfos.raison+"&CodeSecurite="+secretCode;
 

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
  .subscribe(data => {
      //console.log(data._body); 
      console.log(data.json())
      resolve(data.json());
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}

checkTransfertOM(transferInfos) {
  this.transferInfos=transferInfos;
  let link="action=checker_solde_transfert_autre_compte_OrangeMoney&CodeClient="+environment.perfectPhone+
  "&CodeAPI="+environment.codeApi+"&Projet=PERFECTPAY&Code_clientExpediteur="+transferInfos.CodeClientExpediteur+"&Code_clientDestinataire="+
  transferInfos.account+"&Montant="+transferInfos.montant+"&Raison_transfert="+transferInfos.raison;

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
    .subscribe(data => {
      //console.log(data._body); 
      let result=-1;
      try {
        result=data.json()
      } catch (error) {
        
      }
      resolve(result);
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}

makeTransfertOM(transferInfos,secretCode) {  
  let link="action=transfert_account_perfect_pay_vers_orangeMoney&CodeClient="+environment.perfectPhone+
  "&CodeAPI="+environment.codeApi+"&Projet="+ environment.projetPerfectPay+"&Code_clientExpediteur="+transferInfos.CodeClientExpediteur+"&Code_clientDestinataireOrange="+
  transferInfos.account+"&Montant="+transferInfos.montant+"&Raison_transfert="+transferInfos.raison+"&CodeSecurite="+secretCode;
 

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
  .subscribe(data => {
      //console.log(data._body); 
      console.log(data.json())
      resolve(data.json());
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
} 

checkPayment(transferInfos) {
  let link="action=chek_marchand_code&"+
  "Code_client="+transferInfos.CodeClientExpediteur+
  "&CodeMarchand="+transferInfos.Code_marchand+
  "&Montant="+transferInfos.Montant;
 

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
  .subscribe(data => {
      //console.log(data._body);
      let result=-1;
      try {
        result=data.json()
      } catch (error) {
        
      } 
      resolve(data.json());
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}
makePayment(transferInfos,codeSecret) {
  let link="action=paiement_marchand_mobile&Code_client="+transferInfos.CodeClientExpediteur+
  "&CodeMarchand="+transferInfos.Code_marchand+
  "&Montant="+transferInfos.Montant+
  "&CodeSecurite="+codeSecret;

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
  .subscribe(data => {
      //console.log(data._body); 
      let result=-1;
      try {
        result=data.json()
      } catch (error) {
        
      }
      resolve(result);
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}

checkRetrait(transferInfos) {
  let link="action=check_informations_CodePointVente_Retrait_PerfectPayMobile&"+
  "&Code_clientPerfectPay="+transferInfos.CodeClientExpediteur+
  "&CodeAPI="+environment.codeApi+
  "&Projet="+ environment.projetPerfectPay+
  "&CodeClient="+environment.perfectPhone+
  "&Code_PointVentePerfectPay="+transferInfos.code_point_vente+
  "&Montant="+transferInfos.Montant;
 

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
  .subscribe(data => {
      //console.log(data._body);
      let result=-1;
      try {
        result=data.trim().json()
      } catch (error) {
        
      } 
      resolve(data.json());
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}
makeRetrait(transferInfos,codeSecret) {
  let link="action=Valider_Retrait_PerfectPayMobile_NewMethode"+
  "&CodeAPI="+environment.codeApi+
  "&CodeClient="+environment.perfectPhone+
  "&Projet="+ environment.projetPerfectPay+
  "&Code_clientPerfectPay="+transferInfos.CodeClientExpediteur+
  "&Code_PointVentePerfectPay="+transferInfos.code_point_vente+
  "&Montant="+transferInfos.Montant+
  "&CodeSecurite="+codeSecret;

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
  .subscribe(data => {
      //console.log(data._body); 
      let result=-1;
      try {
        result=data.json()
      } catch (error) {
        
      }
      resolve(result);
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}
checkSecret(idClient) {
  let link="action=check_statut_ping&"+"&indexe_users="+idClient
 

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
  .subscribe(data => {
      //console.log(data._body);
      let result=-1000;
      try {
        result=data.json()
      } catch (error) {
        
      } 
      resolve(data.json());
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}
createSecret(idClient,secret) {
  let link="action=New_code_secret&"
  +"&indexe_users="+idClient
  +"&repeat_ping_code="+secret
  +"&ping_code="+secret


 

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
  .subscribe(data => {
      //console.log(data._body);
      let result=-1000;
      try {
        result=data.json()
      } catch (error) {
        
      } 
      resolve(data.json());
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}
updateSecret(idClient,secret,oldSecret) {
  let link="action=create_code_secret&"
  +"&indexe_users="+idClient
  +"&repeat_ping_code="+secret
  +"&ping_code="+secret
  +"&ancien_ping_code="+oldSecret

 

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
  .subscribe(data => {
      //console.log(data._body);
      let result=-1000;
      try {
        result=data.json()
      } catch (error) {
        
      } 
      resolve(data.json());
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}
getSecretStatus(idClient) {

  let link="action=check_statut_ping&"
  +"&indexe_users="+idClient


 

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apilink+link)
  .subscribe(data => {
      //console.log(data._body);
      let result=-1000;
      try {
        result=data.json()
      } catch (error) {
        
      } 
      resolve(data.json());
    }, err => {
      //console.log("Error"); 
      resolve(err);
    })
});
}


disconnect() {
  return new Promise((resolve :any, reject: any) => resolve(localForage.clear())); 
}

  /**
   * 
   * ancien code
   */





  daoSetDefaultDevise(devise) {
    localForage.setItem('devise',devise);
  } 
  daoSetCustomerId(customerId) {
    localForage.setItem('customerId',customerId);
  } 

  daoGetCustomerId() {
    return new Promise((resolve :any, reject: any) => resolve(localForage.getItem('customerId', function (err, value) {  
    }))); 
  }
  daoGetDefaultDevise() {
    return new Promise((resolve :any, reject: any) => resolve(localForage.getItem('devise', function (err, value) {  
    }))); 
  }

  daoGetUser() {
    return new Promise((resolve :any, reject: any) => resolve(localForage.getItem('user', function (err, value) {  
    }))); 
  }
  
  daoSetUser(user) { 
    localForage.setItem('user',user);
    this.user=user; 
  }

  daoGetjournal() {
    return new Promise((resolve :any, reject: any) => resolve(localForage.getItem('journal', function (err, value) {  
    }))); 
  }
  
  daoSetJournal(journal) {
    localForage.setItem('journal',journal);
  }  
  

  daoGetStatus() {
    return new Promise((resolve :any, reject: any) => resolve(localForage.getItem('status', function (err, value) { 

    }))); 
  }
  
  daoSetStatus(status) {
    localForage.setItem('status',status);
    this.status=status; 
  }

  daoGetFState() {
    return new Promise((resolve :any, reject: any) => resolve(localForage.getItem('fstate', function (err, value) { 
       
    }))); 
  } 

  GetLink() {
    return APP_LINK; 
  }
  /**
   * paramètre pour identifier la première utilisation necessaire pour 
   * afficher le slider de démarrage
   * utilisation du natuve storage pour etre sur que les valeurs sont enregistéres 
   * et ne pas buter sur quotadepassed
   */

  async daoGetHaveUsed(): Promise<boolean> {
    let haveUsed:any;
    await localForage.getItem(HAVE_USED)
  .then(
    (data:any) => {if(data)haveUsed=data.state;}
    ,
    error => console.error(error)
  );
    /**
     * 
     */

  return Promise.resolve(haveUsed)||true;

  
}
 /**
  * methode pour dire si l'application a déja été ouverte
  * @param haveUsed boolean set the state of the application
  */
daoSetHaveUsed(haveUsed:boolean) {
  console.log("want to save state");
  localForage.setItem(HAVE_USED, {state: haveUsed, date: new Date().getDate()})
  .then(
    () => console.log("data saved"),
    error => console.error('Error storing item: '+error, error)
  );
   
}
 /**
  * save min version
  */
 daoSetMinVersion(minVersion:number) {
  console.log("want to save minversion");
  localForage.setItem(MINVERSION, {minVersion: minVersion, date: new Date().getDate()})
  .then(
    () => console.log("minVersion saved"),
    error => console.error('Error storing minVersion: '+error, error)
  );
   
}
daoSetMerchantServices(services) {
  console.log("want to save services of merchant");
  localForage.setItem(MERCHANT_SERVICES,services)
  .then(
    () => console.log("services saved"),
    error => console.error('Error storing minVersion: '+error, error)
  );
   
}
async daoGetMerchantServices(): Promise<any> {
  let datas;
  await localForage.getItem(MERCHANT_SERVICES)
  
.then(
  (data:any) => {
    datas=data;
    return Promise.resolve(data);
  }
  ,
  error =>{
    console.error(error)
    return Promise.resolve(false);
  } 
);
return Promise.resolve(datas);

}

  /**
   * paramètre pour identifier le statut d'enregistrement
   */

  async daoGetRegistered(): Promise<boolean> {
    let registered:any;
    await localForage.getItem(REGISTERED)
  .then(
    (data:any) => {if(data)registered=data.state;}
    ,
    error => console.error(error)
  );

  return Promise.resolve(registered)||true;
  
}
/**
 * recupère le nuimero de téléphone de l'utilisateur
 */
async daoGetPhoneNumber(): Promise<any> {
  let phone_number:any;
  await localForage.getItem(REGISTERED)
.then(
  (data:any) => {console.log(data.phoneNumber);
    phone_number=data.phoneNumber;
  }
  ,
  error => console.error(error)
);

return Promise.resolve(phone_number);

}
/**
 * recupère le nuimero de téléphone de l'utilisateur
 */
async daoGetgetUserInfo(): Promise<any> {
  let user:any;
  await localForage.getItem(REGISTERED)
.then(
  (data:any) => {
    user=data;
  }
  ,
  error => console.error(error)
);

return Promise.resolve(user);

}

/**
 * recupère le password de l'utilisateur
 */
async daoGetPassword(): Promise<any> {
  let password:any;
  await localForage.getItem(REGISTERED)
.then(
  (data:any)  => {console.log(data);password=data.pass_word;}
  ,
  error => console.error(error)
);

return Promise.resolve(password);

}



  /**
   * paramètre pour identifier la version minimale
   */

  async daoGetMinVersion(): Promise<number> {
    let minVersion:number=-1;
    await localForage.getItem(MINVERSION)
  .then(
    (data:any) => {
      if(data!=null)
      minVersion=data.minVersion;
      return Promise.resolve(minVersion)}
    ,
    error => { 
      console.log("no min version saved");
     

    }
  );

  return Promise.resolve(minVersion)
  
}
/**
 * enregsitre un user dans l'application avec son numero et la date d'enregistrement
 * @param registered 
 * @param phoneNumber 
 */
daoSetRegistered(registered:boolean,phone_number,password,email?,name?,idClient?) {
  console.log("want to save state");
  localForage.setItem(REGISTERED, {state: registered,phoneNumber:phone_number,pass_word:password,email:email,name:name, idClient:idClient, date: new Date().getDate()})
  .then(
    (data:any)  => console.log("registered"),
    error => console.error('Error storing item'+error, error)
  );
  
}
/**
 * si le user n'est pas encore enregistré on regarde si c'est la première utilisation 
 * et on retoiurne une valeur correspondant à son statut
 */
/* async daoGetState(): Promise<number> {
  let haveUsed:any;
  let registered:boolean;
  let result:number;
  await this.daoGetRegistered().then(saved_registered=>{
    registered=saved_registered;
    if(registered){
      result=VALUE_REGISTERED;
      return Promise.resolve(result);
    }
     
  });
  if(result==VALUE_REGISTERED)  return Promise.resolve(result);
  await this.daoGetHaveUsed().then(saved_firstuse=>{
    haveUsed=saved_firstuse;
    if(haveUsed){
      result=VALUE_HAVE_USED;
      
    }else {
      result=VALUE_FIRST_USE;
    }
  });
  console.log(result+"inside getstate");
  return Promise.resolve(result)||2;

} */

/**
 * 
 */
async daoGetUsability(): Promise<boolean> {
  let result:boolean=false;
  await this.daoGetMinVersion().then(minVersion=>{
    if(minVersion<=ACTUAL_VERSION_VALUE || minVersion==-1){
      result=true;
      return Promise.resolve(result);
    }
     
  });
  return Promise.resolve(result);

}
 

  test() {
    let headers = new Headers();
    //headers.append('Host', 'api.orange.com');
    headers.append('Authorization', 'Bearer RJNNzYWRAKE3An4qQg9EEOIXtC2G');
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let data =
      {
        "merchant_key": "67a655d9",
        "currency": "OUV",
        "order_id": "IPLANS_ORDER_ID_0832106",
        "amount": 1100,
        "return_url": "https://www.iplans.cm/test",
        "cancel_url": "https://www.iplans.cm/txncncld",
        "notif_url": "https://www.iplans.cm/notif",
        "lang": "fr",
        "reference": "TestOPEIPLANS_03199"
      };
    this.http.post('https://api.orange.com/orange-money-webpay/dev/v1/webpayment', data, { headers: headers })
      .map(res => res.json())
      .subscribe(res => {
        console.log(res);
      }, (err) => {
        console.log(err);
        console.log("failed");
      });
  }

  sendCodeConfirmation(number) {

    return new Promise(resolve => {
      this.http.get("http://" + environment.smsServer + "/rest/api/confirmNumber/" + number)
        .subscribe(data => {
          //console.log(data._body); 
          resolve(data._body);
        }, err => {
          //console.log("Error: "+Error); 
          console.log("Error11: "+err.toString); 
          resolve("Error");
        })
    });
  }
  



  getUser(number) {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get("http://" + environment.smsServer + "/rest/api/getUser/" + number)
        .subscribe(data => {
          //console.log(data.json()); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve("Error");                              
        })
    });
  }
  getUserCredit(number) {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get("http://" + environment.smsServer + "/rest/api/getServiceBalance/" + number)
        .subscribe(data => {
          //console.log(data.json()); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve("Error");
        })
    });
  }
  getUserCreditSms(number,password) {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get("http://" + environment.smsServer + "/rest/api/checkSolde/" + number+"/"+password)
        .subscribe(data => {
          //console.log(data.json()); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve("error");
        })
    });
  }

  checkRetraitValidation(number) {
    let action="action=checker_si_retrait_en_cours_mobile";

    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apilink+action+"&Code_clientExpediteurint="+number)
        .subscribe(data => {
          //console.log(data._body); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve(err);
        })
    });
  }
  makeRetraitValidation(number,secretCode,transactionId) {
    let action="action=validation_retrait_account_perfect_pay_Mobile";

    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apilink+action+"&Code_clientExpediteur="+number
      +"&CodeSecurite="+secretCode
      +"&IdTransaction="+transactionId)
        .subscribe(data => {
          //console.log(data._body); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve(err);
        })
    });
  }



  editUser(nom, phoneNumber, newPhoneNumber, email, password) {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get("http://" + environment.smsServer + "/rest/api/editUser/" + nom + "/" + phoneNumber + "/" + newPhoneNumber + "/" + email + "/" + password)
        .subscribe(data => {
          console.log(data.json());
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve("Error");
        })
    });
  }

  createUser(nom, phoneNumber, email, password) {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get("http://" + environment.smsServer + "/rest/api/createUser/" + nom + "/" + phoneNumber + "/" + email + "/" + password)
        .subscribe(data => {
          console.log(data.json());
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve("Error");
        })
    });
  }

  retrySMS(phoneNumber) {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get("http://" + environment.smsServer + "/rest/api/sendSMSNexmo/" + phoneNumber)
        .subscribe(data => { 
          resolve(data._body);
        }, err => {
          //console.log("Error"); 
          resolve("Error");
        })
    });
  }

  saveAndroidMinVersion() {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get("http://" + environment.smsServer + "/rest/api/getAndroidMinVersion")
        .subscribe(data => {
          console.log(data); 
          resolve(data);
        }, err => {
          //console.log("Error"); 
          resolve("Error");
        })
    });
  }

  fundTransfertCardToCard(userId,customerId,last4Digits,amount) { 
    return new Promise(resolve => {
      this.http.get(environment.virementFondCarteToCarte + userId+ "/C2C/"+ amount+ "/"+ customerId+ "/FCFA/"+ last4Digits)
        .subscribe(data => {
          //console.log(data._body); 
          resolve(data._body);
        }, err => {
          //console.log("Error: "+Error); 
          console.log("Error11: "+err.toString); 
          resolve("Error");
        })
    });
  }
  fundTransfertToCard(userId,customerId,last4Digits,amount) { 
    return new Promise(resolve => {
      this.http.get(environment.virementFondCarte + userId+ "/C2C/"+ amount+ "/"+ customerId+ "/FCFA/"+ last4Digits)
        .subscribe(data => {
          //console.log(data._body); 
          resolve(data._body);
        }, err => {
          //console.log("Error: "+Error); 
          console.log("Error11: "+err.toString); 
          resolve("Error");
        })
    });
  }

  getUserOperations(userId) { 
    return new Promise(resolve => {
      this.http.get(environment.getUserOperation + userId)
        .subscribe(data => {
          console.log(data.json()); 
          resolve(data.json());
        }, err => {
          //console.log("Error: "+Error); 
          console.log("Error11: "+err.toString); 
          resolve("Error");
        })
    });
  }

  transfertCreditToMoMo(userId,amount) { 
    amount=amount* 10000.00;
    return new Promise(resolve => {
      this.http.get(environment.transfertCreditToMOMO + userId+ "/"+ amount)
        .subscribe(data => {
          resolve(data._body);
        }, err => {
          //console.log("Error: "+Error); 
          console.log("Error11: "+err.toString); 
          resolve("Error");
        })
    });
  }

  setCustomerId(idClient,customerId) {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get(environment.setCustomerId + idClient+ "/"+ customerId)
        .subscribe(data => {
          //console.log(data._body); 
          resolve(data._body);
        }, err => {
          //console.log("Error"); 
          resolve("-1");
        })
    });
  }

  getPendingPayment(phoneNumber) {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get(environment.pendingPayment + phoneNumber)
        .subscribe(data => {
          //console.log(data.json()); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve("-1");
        })
    });
  }

  validatePendingPayment(idPayment,smsCode) {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get(environment.validatePendingPayment + idPayment+ "/"+ smsCode)
        .subscribe(data => {
          //console.log(data._body); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve("-1");
        })
    });
  }
}