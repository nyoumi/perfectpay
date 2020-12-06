import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StripePayment } from './stripePayment';


@NgModule({
  declarations: [StripePayment],
  imports: [
    IonicPageModule.forChild(StripePayment),
  ],
  exports:[StripePayment]
 
})
export class StripePaymentModule {}
