import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VirementPage } from './virement';

@NgModule({
  declarations: [
    VirementPage,
  ],
  imports: [
    IonicPageModule.forChild(VirementPage),
  ],
  exports:[VirementPage],
})
export class VirementPageModule {}
