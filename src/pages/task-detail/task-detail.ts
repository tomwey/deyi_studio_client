import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { TaskService } from '../../providers/task-service';
// import { Clipboard } from 'ionic-native';
import * as Clipboard from 'clipboard';

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

    let seconds = this.distanceSeconds(this.task.expire);
    if (seconds <= 0) {
      this.countdown = "00:00";
    } else {
      this.countdown = this.formatTimeString(seconds);

      this.startTimer();
    }

    let clipboard = new Clipboard('.btn');
    console.log(clipboard);
  }

  // 计算时间差值，单位为秒
  distanceSeconds(expire) {
    let timestamp = Math.floor(new Date().getTime() / 1000);
    return parseInt(expire) - timestamp;
  }

  // 格式化显示分秒
  formatTimeString(seconds) {
    var min = Math.floor(seconds / 60);
    var sec = seconds - min * 60;
    var formatSec = sec.toString();
    if (formatSec.length < 2) {
      formatSec = '0' + formatSec;
    }
    return `${min}:${formatSec}`;
  }

  // 创建并启动一个定时器
  startTimer() {
    var timer = setInterval(() => {
      // console.log('123...');
        // let timestamp = new Date().getTime();
        let seconds = this.distanceSeconds(this.task.expire);
        // console.log(seconds);
        if (seconds <= 0) {
          this.countdown = "00:00";
          clearInterval(timer);
        } else {
          this.countdown = this.formatTimeString(seconds);
        }
      }, 1000);
  }

  // 复制关键字并打开苹果商店
  copyAndOpenAppStore() {
    // Clipboard.copy('test');
    
    // Clipboard.paste().then(
    //   (resolve: string) => {
    //     alert(resolve);
    //   },
    //   (reject: string) => {
    //     alert('Error: ' + reject);
    //   }
    // );

    // 打开苹果商店
    window.location.href = "itms-apps://";
  }

  // 点击返回按钮
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

  // 取消任务
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

  // 提交任务
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

  // 显示提示信息
  showToast(err) {
    let toast = this.toastCtrl.create({
      message: err,
      duration: 2000,
    });
    toast.present();
  }

  // 显示Loading
  showLoading() :any {
    let loading = this.loadingCtrl.create({
      spinner: 'ios'
    });
    loading.present();
    return loading;
  }
}
