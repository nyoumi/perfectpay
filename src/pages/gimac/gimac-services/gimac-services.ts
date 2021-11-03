import { EventEmitter, Injectable } from "@angular/core";
import * as localForage from "localforage";
import { Http, Headers } from '@angular/http';
import 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from "../../../environment/environment";

const  REGISTERED="REGISTERED";
const  HAVE_USED="HAVEUSED";


const  VALUE_REGISTERED=2;
const  VALUE_HAVE_USED=1;
const  VALUE_FIRST_USE=0;

const  ACTUAL_VERSION_VALUE=10;
const  APP_LINK="http://play.google.com/store/apps/details?id=cm.iplans.call";

   
const  MINVERSION="MINVERSION";


@Injectable()
export class GimacServices {

  scanner: EventEmitter<number> = new EventEmitter<number>();

 
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

scanned(data){
  this.scanner.emit(data);
}
 

  authentification(email, password) {
    //var xml2js = require('xml2js');
    let params="action=login_account&login="+email+"&password="+password;
    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apiGimacLink + params)
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
      this.http.get("https://" + environment.server + environment.apiGimacLink + params)
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
      this.http.get("https://" + environment.server + environment.apiGimacLink+action)
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
      this.http.get("https://" + environment.server + environment.apiGimacLink+action)
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
      this.http.get("https://" + environment.server + environment.apiGimacLink+action+"&indexe_users="+idClient+"&secret_code="+secretCode)
        .subscribe(data => {
          //console.log(data._body); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve(err);
        })
    });
  }
  getHistory(idClient) {
    let action="action=check_transaction_update";

  return new Promise(resolve => {
    this.http.get("https://" + environment.server + environment.apiGimacLink+action+"&indexe_users="+idClient)
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
  checkTransfertMNO(transferInfos) {

    this.transferInfos=transferInfos;
    let link="action=Solde_transfert_walet_MNO&CodeClient="+environment.perfectPhone+
    "&CodeAPI="+environment.codeApi+"&Projet=PERFECTPAY&Code_clientExpediteur="+transferInfos.CodeClientExpediteur+"&Code_clientDestinataire="+
    transferInfos.Code_clientDestinataire+"&Montant="+transferInfos.Montant+"&WalletDestinataire="+transferInfos.WalletDestinataire;

  return new Promise(resolve => {
    this.http.get("https://" + environment.server + environment.apiGimacLink+link)
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
checkTransfertBank(transferInfos) {

  this.transferInfos=transferInfos;
  let link="action=Solde_transfert_walet_Banque&CodeClient="+environment.perfectPhone+
  "&CodeAPI="+environment.codeApi+"&Projet=PERFECTPAY&Code_clientExpediteur="+transferInfos.CodeClientExpediteur+"&Code_clientDestinataire="+
  transferInfos.Code_clientDestinataire+"&Montant="+transferInfos.Montant+"&WalletDestinataire="+transferInfos.WalletDestinataire;

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apiGimacLink+link)
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
makeTransfertMNO(transferInfos,secretCode) {  
  
 
  let link="action=Valide_Transfert_walet_MNO&Code_clientExpediteur="+environment.perfectPhone+
  "&CodeAPI="+environment.codeApi+"&Projet="+ environment.projetPerfectPay+"&Code_clientExpediteur="+transferInfos.CodeClientExpediteur+"&Code_clientDestinataire="+
  transferInfos.Code_clientDestinataire+"&Montant="+transferInfos.Montant+"&WalletDestinataire="+transferInfos.WalletDestinataire+"&ReferenceTransaction="+transferInfos.reference+"&CodeSecurite="+secretCode;
 

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apiGimacLink+link)
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
makeTransfertBank(transferInfos,secretCode){
  let link="action=Valide_Transfert_walet_Banque&Code_clientExpediteur="+environment.perfectPhone+
  "&CodeAPI="+environment.codeApi+"&Projet="+ environment.projetPerfectPay+"&Code_clientExpediteur="+transferInfos.CodeClientExpediteur+"&Code_clientDestinataire="+
  transferInfos.Code_clientDestinataire+"&Montant="+transferInfos.Montant+"&WalletDestinataire="+transferInfos.WalletDestinataire+"&ReferenceTransaction="+transferInfos.reference+"&CodeSecurite="+secretCode;
 

return new Promise(resolve => {
  this.http.get("https://" + environment.server + environment.apiGimacLink+link)
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
  this.http.get("https://" + environment.server + environment.apiGimacLink+link)
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
  this.http.get("https://" + environment.server + environment.apiGimacLink+link)
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
  this.http.get("https://" + environment.server + environment.apiGimacLink+link)
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
  this.http.get("https://" + environment.server + environment.apiGimacLink+link)
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
    error => console.log(error)
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

 



  sendCodeConfirmation(number) {

    return new Promise(resolve => {
      this.http.get("https://" + environment.smsServer + "/rest/api/confirmNumber/" + number)
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
      this.http.get("https://" + environment.smsServer + "/rest/api/getUser/" + number)
        .subscribe(data => {
          //console.log(data.json()); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
          resolve("Error");                              
        })
    });
  }



  checkRetraitValidation(number) {
    let action="action=checker_si_retrait_en_cours_mobile";

    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apiGimacLink+action+"&Code_clientExpediteurint="+number)
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
      this.http.get("https://" + environment.server + environment.apiGimacLink+action+"&Code_clientExpediteur="+number
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





  saveAndroidMinVersion() {
    //var xml2js = require('xml2js');
    return new Promise(resolve => {
      this.http.get("https://" + environment.smsServer + "/rest/api/getAndroidMinVersion")
        .subscribe(data => {
          //console.log(data.json()); 
          resolve(data.json());
        }, err => {
          //console.log("Error"); 
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






  getGimacBankCountries(){
    let action="action=liste_pays_gimac_bacaire";
    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apiGimacLink+action)
        .subscribe(data => {
          console.log(data.json()); 
          resolve(data.json());
        }, err => {
          console.log("Error");    
          resolve(err);
        })
    });
  }
  getGimacMNOCountries(){
    let action="action=liste_pays_gimac_mno";
    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apiGimacLink+action)
        .subscribe(data => {
          console.log(data.json()); 
          resolve(data.json());
        }, err => {
          console.log("Error");    
          resolve(err);
        })
    });
  }
  getGimacMNOWallets(id_pays){
    let action="action=liste_oparateurs_mno_pays&id_pays=";
    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apiGimacLink+action+id_pays)
        .subscribe(data => {
          console.log(data.json()); 
          resolve(data.json());
        }, err => {
          console.log("Error");    
          resolve(err);
        })
    });
  }
  getGimacBankWallets(id_pays){
    let action="action=liste_oparateurs_bancaires_pays&id_pays=";
    return new Promise(resolve => {
      this.http.get("https://" + environment.server + environment.apiGimacLink+action+id_pays)
        .subscribe(data => {
          console.log(data.json()); 
          resolve(data.json());
        }, err => {
          console.log("Error");    
          resolve(err);
        })
    });
  }
}