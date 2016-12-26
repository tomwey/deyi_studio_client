import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { TaskService } from '../../providers/task-service';
import { UserService } from '../../providers/user-service';

import { TaskDetailPage } from '../task-detail/task-detail';

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

  user: any;
  grabbedTaskData: any;

  task_list: any = { current: [], after: [], completed: [] };
  constructor(public navCtrl: NavController, 
              public taskService: TaskService, 
              public userService: UserService,
              public loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
                // this.loading = this.loadingCtrl.create({
                //   spinner: 'ios'
                // });
              }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TaskPage');
    // this.reloadTaskList();
  }

  ionViewWillEnter() {
    // console.log('eeeeeee');
    this.reloadTaskList();
  }

  reloadTaskList() {
    console.log('reload');

    let loading = this.loadingCtrl.create({
      spinner: 'ios',
    });
    // let loading = this.loading;

    loading.present();

    this.userService.currentUser().then(data => {
      let user = JSON.parse(data);
      this.user = user;
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

  gotoTaskDetail(task) {
    this.navCtrl.push(TaskDetailPage, { task: task, user: this.user, callback: this.reloadTaskList });
  }

  grabTask(task_id) {
    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: '拼命抢任务中...',
    });
    // let loading = this.loading;

    loading.present();

    this.taskService.grabTask(this.user.id, task_id).then(data => {
      console.log(data);
      loading.dismiss();
      // this.grabbedTaskData = { task: data, uid: this.user.id };
      this.navCtrl.push(TaskDetailPage, { task: data, user: this.user, callback: this.reloadTaskList });
    }, err => {
      loading.dismiss();
      setTimeout(() => {
        let toast = this.toastCtrl.create({
          message: err,
          duration: 2000,
          position: 'middle'
        });
        toast.present();
      }, 500);
      console.log(err);
    });
  }

}
