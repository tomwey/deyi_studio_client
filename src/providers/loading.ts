import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the Loading provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Loading {
  spinner: any;
  constructor(public loadingCtrl: LoadingController) {
    this.spinner = this.loadingCtrl.create({
      spinner: 'ios',
    });
    this.spinner.onDidDismiss( () => {
      console.log('Loading Dismiss');
    });
  }

  show() {
    this.spinner.present();
  }

  dismiss() {
    this.spinner.dismiss();
  }

}
