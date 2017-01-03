import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TaskPage } from '../pages/task/task';
import { TaskDetailPage } from '../pages/task-detail/task-detail';
import { ApiService } from '../providers/api-service';
import { UserService } from '../providers/user-service';
import { TaskService } from '../providers/task-service';
import { Loading } from '../providers/loading';
import { Storage } from '@ionic/storage';
// import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TaskPage,
    TaskDetailPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      // backButtonIcon: 'arrow-back',
      // backButtonText: '返回',
    }),
    // ClipboardModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TaskPage,
    TaskDetailPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    ApiService,
    TaskService,
    Storage,
    Loading,
  ]
})
export class AppModule {}
