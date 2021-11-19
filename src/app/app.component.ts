import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PerfectTransfertPage } from '../pages/pertfect-transfert/perfect-transfert';
import { LoginPage } from '../pages/login/login';
import { PerfectPaymentPage } from '../pages/pertfect-payment/perfect-payment';
import { Services } from '../services/services'; 
import { FormBuilder } from '@angular/forms';
import { PayementService } from '../services/payement.service';

import { Deeplinks } from '@ionic-native/deeplinks';
import { GimacHistoryPage } from '../pages/gimac/gimac-history/gimac-history';
import { GimacPaymentPage } from '../pages/gimac/gimac-payment/gimac-payment';
import { HistoryPage } from '../pages/history/history';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any ;
  status:boolean;
  user:any;


  pages: Array<{title: string, component: any}>;
  secretStatus: boolean=false;

  constructor(public platform: Platform, protected deeplinks: Deeplinks,
      public alerCtrl: AlertController,
    public formbuilder: FormBuilder,
    public services: Services, 
    private toastCtrl: ToastController,
    public loadingController: LoadingController,
     public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'home', component: HomePage },
      { title: 'transfert', component: PerfectTransfertPage },
      { title: "paiement", component: PerfectPaymentPage, },
/*       { title: "Taux de change", component: ExchangeRatePage },
 */

    ];

  }
  async ngOnInit() {
    //this.rootPage=PrincipalPage;
   await this.initializeApp(); 

   
   this.services.daoGetUser().then(infos=>{
     console.log(infos)
     this.user=infos; 
    });   
     this.services.daoGetHaveUsed().then(infos=>{
 /*       if(!infos){
         this.services.daoAddNotifications(    {
          "titre":"Bienvenue",
          "message": "Bienvenue sur PerfectPay.  Vous pouvez commecner à effectuer vos opérations. ",
          "date":"18/12/2021 12:30",
          "status":"unread"
        }
        )
         
       } */
       
      this.secretStatus=infos; }); 
 }
 disconnect(){
   this.services.disconnect().then(data=>{
     this.nav.setRoot(LoginPage)
   })

 }
  async initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.deeplinks.route({
        '/home': HomePage,
        '/history': HistoryPage,
        '/gimac-history': GimacHistoryPage,
        '/transfert/:phoneNumber/:montant/:reason': HistoryPage,
        '/payment/:codeClient/:montant/:wallet': GimacPaymentPage,


      }).subscribe((match) => {
        // match.$route - the route we matched, which is the matched entry from the arguments to route()
        // match.$args - the args passed in the link
        // match.$link - the full link data
        console.log('Successfully matched route', match);
        //this.nav.push(match.$route, match.$args)
      },
      (nomatch) => {
        // nomatch.$link - the full link data
        console.error('Got a deeplink that didn\'t match', nomatch);
      });
    });
      /**
     * verifie si c'est la première utilisation
     */
     await this.services.daoGetStatus().then((status:any)=>{
      this.status=status;
      switch (this.status) {
        case false:
          this.rootPage=LoginPage;
          break;
   
        case true:
          this.rootPage=HomePage;  
          break;

        default:
          this.rootPage=LoginPage;
          break;
      }  

     });
     return true;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  secretUpdate(){
    let alert = this.alerCtrl.create();
    alert.setTitle("Code secret");
    alert.setSubTitle("Veuillez définir votre code secret")
    alert.setMessage("votre code secret vous permet de sécuriser vos opération PerfectPay. Vous devez donc le conserver de manière confidentielle!")
    alert.setMode("ios")


    alert.addInput({
      type:'password',
      name:'secret',
      placeholder:"nouveau code secret (123456)"
    });
    alert.addInput({
      type:'password',
      name:'secretConfirm',
      placeholder:"Confirmer"
    });
    alert.addInput({
      type:'password',
      name:'oldSecret',
      placeholder:"ancien code secret"
    });
    alert.addButton({
      text:'ok',
      handler:datas=>{
        let codeClient;
        if(this.user){
          codeClient=this.user[0].Indexe;
        }else{
           this.services.daoGetUser().then(user=>{
             this.user=user;
            this.secretUpdate()
          })
        }
       
        if(datas.secret == ""){
          this.showErrorToast("Veuillez saisir Votre code secret");
          
          return ;
        }
        if(datas.oldSecret == ""){
          this.showErrorToast("Veuillez saisir Votre ancien code secret");
          this.secretUpdate()
          return ;
        }
        if(datas.secret != datas.secretConfirm ){
          this.showErrorToast("Les codes que vous avez saisi ne sont pas identiques");
          this.secretUpdate()
          return;
        }
        
    this.services.updateSecret(codeClient,datas.secret,datas.oldSecret).then((result:any)=>{
      if (result.succes==1) {
        let alert2= this.alerCtrl.create();
        alert2.setTitle("Succès de l'opération");
        alert2.setSubTitle("Code secret Modifié avec succès")
        alert2.setMessage("Ce code secret vous sera demandé lors de vos opérations PerfectPay. ")
        alert2.setMode("ios")
        alert2.present()
    
      } else {
        if(result.succes==-3){
          let alert2= this.alerCtrl.create();
          alert2.setTitle("Echec de l'opération");
          alert2.setSubTitle("Code secret non modifié!")
          alert2.setMessage("Desoler votre Ancien code ping est incorrect veuillez contacter le support au numero +237 2 33 47 28 66")
          alert2.setMode("ios")
          alert2.present()
        }else{
        let alert2= this.alerCtrl.create();
        alert2.setTitle("Echec de l'enregistrement");
        alert2.setSubTitle("Code secret non modifié!")
        alert2.setMessage("Une erreur s'est produite lors de l'enregistrement de votre code secret ")
        alert2.setMode("ios")
        alert2.present()
      }
    }
    })

      
      }

    });
    alert.present()
  


  }

  showErrorToast(data: any) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      dismissOnPageChange:true,
      cssClass:"toast-error",
      position: 'top',
    
    });
    
 
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  
    showHelp(){
    let alert = this.alerCtrl.create();
    alert.setTitle("Contact");
    alert.setSubTitle("Besoin d'aide?")
    alert.setMessage("Contactez-nous par Tel: (Std) +237 (2) 33 52 00 02 / +237 (2) 33 52 00 03 <br>Email: info@kakotel.com")
    alert.setMode("ios")
    alert.present()


  }
  ddd(){
    let alert = this.alerCtrl.create();
    alert.setTitle("Partenaires");
    alert.setSubTitle("Voulez-vous être partenaire?")
    alert.setMessage("Contactez-nous par Tel: (Std) +237 (2) 33 52 00 02 / +237 (2) 33 52 00 03 <br>Email: info@kakotel.com")
    alert.setMode("ios")
    alert.present()
  }
  achatServices(){
    let alert = this.alerCtrl.create();
    alert.setTitle("Achat de produits et services");
    alert.setSubTitle("Bientôt disponible dans votre aplication")
    alert.setMessage("Contactez-nous par Tel: (Std) +237 (2) 33 52 00 02 / +237 (2) 33 52 00 03 <br>Email: info@kakotel.com")
    alert.setMode("ios")
    alert.present()
  }
  showPersonnalInfos(){
    /**
     * refresh user datas
     */
    this.services.daoGetUser().then(infos=>{
      console.log(infos)
      this.user=infos[0]; 
      let alert = this.alerCtrl.create();
      alert.setTitle("Mon Compte");
      alert.setSubTitle("Informations personnelles")
      alert.setMessage("Nom: "+this.user.Nom +"<br>"+"Telephone: "+this.user.Telephone+"<br>"+" "+this.user.Prenom+"<br>Adresse Email: "+this.user.Email)
      alert.setMode("ios")
      alert.present()
      console.log(JSON.stringify(this.user, null, 4))
     }); 
  


  }
  showOngoingRetrait(){
    let loading = this.loadingController.create({ content: "chargement..."});
    loading.present();
    this.services.daoGetUser().then(infos=>{
      loading.dismiss();
     
      this.user=infos[0]; 
      this.services.checkRetraitValidation(this.user.Telephone).then((response:any)=>{
        let alert = this.alerCtrl.create();
        alert.setTitle("Retrait en cours");
        alert.setSubTitle("Validation de retrait")
        alert.setMessage(response.msg)
        alert.setMode("ios")
        alert.present()
        
        if(response.succes==1){
          alert.addInput({
            type:'password',
            name:'secret_code',
            placeholder:"Veuillez entrer votre code secret"
          });
          alert.addButton("Annuler")

          alert.addButton({
            text:'Valider',
            handler:data=>{
              if(!data.secret_code) return
              let loading = this.loadingController.create({ content: "chargement..."});
              loading.present();
                 this.services.makeRetraitValidation(this.user.Telephone,data.secret_code,response.IdTransaction ).then((response:any)=>{
                  loading.dismiss();
                  let alert = this.alerCtrl.create();
            
                  switch (response.succes) {
                    case 1:
            
                      alert.setTitle("Opération effectuée avec succès" );
                      alert.setMode("ios");
                      alert.setMessage(response.msg);
                      
                  
                      break;
            
                    default:
                      
                      alert.setTitle("Echec de l'opération" );
                      alert.setMode("ios");
                      alert.setMessage(response.msg);
                      break;
                  }
                  alert.addButton("OK")
                  alert.present();

                })
              

            }
      
          });
        }else{
          alert.addButton("OK")


        }
 
       }); 
      
     
     }); 
    /**
     * refresh user datas
     */
 



  }
  changeSecret(){
    let alert = this.alerCtrl.create({
      mode:"ios",
      title: 'Authentification',
      message: 'Veuillez entrer votre code secret pour continuer',
      inputs: [
        {
          name: 'secret_code',
          placeholder: '123456',
          type:"password"
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          
        },
        {
          text: 'Valider',
          handler: data => {
            if(!data.secret_code) return
            let loading = this.loadingController.create({ content: "chargement..."});
            loading.present();
            console.log(data.secret_code)
            this.services.getSoldeClient(this.user[0].Indexe,data.secret_code).then((solde:any)=>{
              loading.dismiss();
              if(solde.succes==-1){
               
              }
                if(solde.succes==1){
                  let alert = this.alerCtrl.create();
                  alert.setTitle("Solde Actuel" );
                  alert.setMode("ios");
                  alert.setMessage(solde.resultat[0].Solde+ " FCFA");
                  alert.addButton("OK")
                  alert.present();
                  alert.setMode("ios")

                  return ;
                }


            })
          }
        }
      ]
    });

    
    alert.present();
    alert.setMode("ios")

    
  }
}