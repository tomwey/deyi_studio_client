import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { UserService } from '../../providers/user-service';

import { TaskPage } from '../task/task';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  uid: string;

  constructor(public navCtrl: NavController, 
              public userService: UserService, 
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {}

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }

  login() {
    // console.log(this.uid);
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
    });

    loading.present();
    this.userService.login(this.uid).then(data => {
      // console.log(data);
      loading.dismiss();

      // this.navCtrl.push(TaskPage);
      setTimeout(() => {
        this.navCtrl.setRoot(TaskPage);
      }, 200);
      
    }, err => {
      // console.log(err);
      loading.dismiss();
      
      setTimeout(() => {
        let toast = this.toastCtrl.create({
          message: err,
          duration: 2000,
        });
        toast.present();
      }, 500);

    });
  }

}
