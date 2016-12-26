import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { TaskService } from '../../providers/task-service';
import { UserService } from '../../providers/user-service';

// import { Loading } from '../../providers/loading';

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
  constructor(public navCtrl: NavController, 
              public taskService: TaskService, 
              public userService: UserService,
              public loadingCtrl: LoadingController) {}

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TaskPage');
    this.reloadTaskList();
  }

  reloadTaskList() {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
    });
    loading.present();

    this.userService.currentUser().then(data => {
      let user = JSON.parse(data);
      this.taskService.getTaskList(user.id).then(data => {
        console.log(data);
        this.task_list = data;
        
        loading.dismiss();
        
      }, err => {
        console.log(err);
        // this.loading.dismiss();
        loading.dismiss();
      })
    });
  }
  
  grabTask(task_id) {
    console.log(task_id);
  }

}
