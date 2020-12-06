import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangeRatePage } from './exchange-rate';

@NgModule({
  declarations: [
    ExchangeRatePage,
  ],
  imports: [
    IonicPageModule.forChild(ExchangeRatePage)
  ],
  exports:[ExchangeRatePage],
})
export class ExchangeRatePageModule {}
