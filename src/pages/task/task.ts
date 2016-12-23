import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TaskService } from '../../providers/task-service';
import { UserService } from '../../providers/user-service';

/*
  Generated class for the Task page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task',
  templateUrl: 'task.html'
})
export class TaskPage {

  task_list: any = { current: [], after: [], completed: [] };
  constructor(public navCtrl: NavController, public taskService: TaskService, public userService: UserService) {}

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TaskPage');
    this.userService.currentUser().then(data => {
      let user = JSON.parse(data);
      this.taskService.getTaskList(user.id).then(data => {
        console.log(data);
        this.task_list = data;
      }, err => {
        console.log(err);
      })
    });
  }

}
