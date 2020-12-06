import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransfertCardToCardPage } from './transfert-card-to-card';

@NgModule({
  declarations: [
    TransfertCardToCardPage,
  ],
  imports: [
    IonicPageModule.forChild(TransfertCardToCardPage),
  ],
  exports:[TransfertCardToCardPage],
})
export class TransfertCardToCardPageModule {}
