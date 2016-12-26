import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { TaskService } from '../../providers/task-service';

/*
  Generated class for the TaskDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html'
})
export class TaskDetailPage {

  task: any;
  user: any;
  callback: any;
  countdown: any;



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private taskService: TaskService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) {
    // this.navCtrl.set
    // console.log(navParams);
    this.task = navParams.get('task');
    this.user = navParams.get('user');
    this.callback = navParams.get('callback');


    this.countdown = "29:59";
    let timestamp = new Date().getTime();
    let seconds = parseInt(this.task.expire) - timestamp;
    if (seconds <= 0) {
      this.countdown = "00:00";
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    var timer = setInterval(() => {
        let timestamp = new Date().getTime();
        let seconds = parseInt(this.task.expire) - timestamp;

        if (seconds <= 0) {
          this.countdown = "00:00";
          clearInterval(timer);
        } else {
          var min = seconds / 60;
          var sec = seconds - min * 60;
          this.countdown = `${min}:${sec}`;
        }
      }, 1000);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TaskDetailPage');
  }

  goBack() {
    let alert = this.alertCtrl.create({
      title: '放弃任务？',
      message: '您确定要放弃该任务吗？',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.cancelTask();
          }
        },
        {
          text: '取消',
          handler: () => {
            console.log('点击了取消按钮');
          }
        }
      ]
    });
    alert.present();
  }

  cancelTask() {
    let loading = this.showLoading();

    this.taskService.cancelTask(this.user.id, this.task.id, this.task.task_log_id).then(data => {
      loading.dismiss();
      setTimeout(() => {
        this.navCtrl.pop(() => {
          if (this.callback)
            this.callback();
        });
      }, 200);
    }, err => {
      loading.dismiss();

      this.showToast(err);
    });
  }

  commitTask() {
    let loading = this.showLoading();

    this.taskService.commitTask(this.user.id, this.task.id, this.task.task_log_id).then(data => {
      loading.dismiss();
      setTimeout(() => {
        this.navCtrl.pop(() => {
          if (this.callback)
            this.callback();
        });
      }, 200);
    }, err => {
      loading.dismiss();

      this.showToast(err);
    });
  }

  showToast(err) {
    let toast = this.toastCtrl.create({
      message: err,
      duration: 2000,
    });
    toast.present();
  }

  showLoading() :any {
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    loading.present();
    return loading;
  }
}
