import { Component ,ViewChild} from '@angular/core';
import { AlertController, LoadingController, NavController,Slides } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Services } from '../../services/services';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { PAYS } from '../../services/countries';

 

@Component({
  selector: 'page-register', 
  templateUrl: 'register.html'
})
export class RegisterPage {
  @ViewChild(Slides) slides: Slides;
  slider:any;
  formgroup: FormGroup; 
  private email: AbstractControl;
  private nom: AbstractControl;
  private Prenom: AbstractControl;
  private Region: AbstractControl;

  private Telephone: AbstractControl;

  private Departement: AbstractControl;
  private DateNaissance: AbstractControl;
  private Ville: AbstractControl;
  private dial_code: AbstractControl;



  private countries: any = PAYS;
  private regions:any=[];
  private Departements:any[]=[];


  private country: any;
  private region: any
  private id;
  private departement;
  private DepartementsTotal:any[];
  private regionsel;
   service;

  constructor(public navCtrl: NavController,
    public alerCtrl: AlertController,
    public formbuilder: FormBuilder,public services: Services, 
    public loadingController: LoadingController) {
         this.service = {
     id: 1, name: "vente simple"
    }; 
    this.services.getRegions().then((result:any)=>{
      if(result.resultat ) this.regions=result.resultat;
    })
    this.services.getDepartments().then((result:any)=>{
      if(result.resultat ) this.DepartementsTotal=result.resultat;
    })

    this.formgroup = formbuilder.group({
      email: ['',Validators.compose([Validators.required, Validators.email])], 
      nom: ['', Validators.required],
      Prenom: ['', Validators.required],
      Region: ['', Validators.required],
      Telephone: ['', Validators.required],
      Departement: ['', Validators.required],
      DateNaissance: ['', Validators.required],
      Ville: ['', Validators.required],
      dial_code:['', Validators.required],
      

    });
    this.email = this.formgroup.controls['email'];
    this.nom = this.formgroup.controls['nom'];
    this.Prenom = this.formgroup.controls['Prenom'];
    this.Region = this.formgroup.controls['Region'];
    this.Telephone = this.formgroup.controls['Telephone'];
    this.Departement = this.formgroup.controls['Departement'];
    this.DateNaissance = this.formgroup.controls['DateNaissance'];
    this.Ville = this.formgroup.controls['Ville'];
    this.dial_code=this.formgroup.controls['dial_code'];
  }
  countryChange(){ 
    this.formgroup.controls['dial_code'].setValue("+"+this.country.dial_code);
  }
  regionChange(){
    console.log()
     this.Departements=[]
     let reg=this.Region.value
    for (let index = 0; index < this.DepartementsTotal.length; index++) {
      const dep = this.DepartementsTotal[index];
      console.log(dep.region_id)
      if(dep.region_id==reg ){
        this.Departements.push(dep)
      }
      
    }
    console.log(this.Departements)
  }
  
  goToPreviousSlide() {
    this.slides.slidePrev(500,true);
  }
 
  goToNextSlide(){
    //this.slides.direction="vertical";
   // this.slides.slideNext(500,true);
   this.slides.lockSwipeToNext(false)

    this.slides.slideNext(500,false)
  }
  ionViewDidLoad() {
    this.slides.enableKeyboardControl(false);
    this.slides.nextButton=document.getElementById("nextButton");
    this.id=this.slides.getActiveIndex();
    this.slides.autoplay=false
    this.slides.lockSwipeToNext(true)
    this.slides.spaceBetween=16;
    //this.slides.effect="coverflow";
  }
  slideChanged(){
    this.id=this.slides.getActiveIndex();
    console.log(this.id);
    if(this.id=1){
      this.slides.lockSwipeToNext(true)

    }
    
    
  }
  register() {
    let loading = this.loadingController.create({ content: "Connexion"});
    loading.present();
    let UserInfo={
      email:this.email.value,
      nom:this.nom.value,
      Prenom:this.Prenom.value,
      Region:this.Region.value,
      Telephone:this.Telephone.value,
      Departement:this.Departement.value,
      DateNaissance:this.DateNaissance.value,
      Ville:this.Ville.value,



    }
    
      this.services.register(UserInfo).then((result: any) => {
           console.log(result)
        loading.dismiss();
        //console.log(result);
        if(result.succes==1){
          let alert = this.alerCtrl.create();
          alert.setTitle("Succès de l'enregistrement" );
          alert.setMode("ios");
alert.setMessage(result.msg);
          alert.addButton("OK")
          alert.present();
          this.navCtrl.setRoot(LoginPage);
      }else{
        let message;
        switch (result.succes) {
          case 0:
            message="Veuillez remplir tous les champs"
            break;
          case 2:
            message="Numéro de téléphone déja utilisé"
            break;           

          case 3:
            message="Adresse email deja utilisée"
            break;    
            
          case 5:
            message="Mots de passes non identiques"
            break;             
          default:
            message="Erreur lors de l'enregistrement"

            break;
        }
        let alert = this.alerCtrl.create();
        alert.setTitle("Erreur lors de l'enregistrement" );
        alert.setMode("ios");
alert.setMessage(message);
        alert.addButton("OK")
        alert.present();

      }
    });
  
  }
  gotoLogin(){
    this.navCtrl.setRoot(LoginPage);

  }

}
