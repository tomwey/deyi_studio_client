import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TaskPage } from '../pages/task/task';
import { ApiService } from '../providers/api-service';
import { UserService } from '../providers/user-service';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TaskPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TaskPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    ApiService,
    Storage
  ]
})
export class AppModule {}
