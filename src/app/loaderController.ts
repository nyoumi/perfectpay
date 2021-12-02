import {Injectable} from "@angular/core";
import {Loading, LoadingController, LoadingOptions, Platform} from "ionic-angular";


@Injectable()
export class LoaderController {

  constructor(
    private loadingCtrl: LoadingController,
    private platform: Platform
  ) {

  }

  create(opts?: LoadingOptions): Loading {
    let subscription;
    let loading = this.loadingCtrl.create(opts);

    loading.willEnter.subscribe(() => {
      subscription = this.platform.registerBackButtonAction(() => {
        console.log('back button pressed');
      }, 10);
    });

    loading.onDidDismiss(() => {
      subscription();
    });

    return loading;
  }
}