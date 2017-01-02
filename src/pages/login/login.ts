import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { UserService } from '../../providers/user-service';

import { Loading } from '../../providers/loading';

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
              public loading: Loading,
              private toastCtrl: ToastController) {}

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }

  login() {
    // console.log(this.uid);
    this.loading.show();

    this.userService.login(this.uid).then(data => {
      // console.log(data);
      this.loading.dismiss();

      // this.navCtrl.push(TaskPage);
      this.navCtrl.setRoot(TaskPage);
    }, err => {
      // console.log(err);
      this.loading.dismiss();
      
      let toast = this.toastCtrl.create({
        message: err,
        duration: 2000,
      });
      toast.present();
      
    });
  }

}
