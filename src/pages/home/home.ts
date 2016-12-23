import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserService } from '../../providers/user-service';

import { LoginPage } from '../login/login';
import { TaskPage } from '../task/task';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public userService: UserService) {
    this.userService.currentUser().then((user) => {
      // console.log(user);
      if (user) {
        this.navCtrl.setRoot(TaskPage);
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

}
