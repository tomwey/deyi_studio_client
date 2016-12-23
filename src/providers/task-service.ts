import { Injectable } from '@angular/core';
import { ApiService } from './api-service';

/*
  Generated class for the TaskService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TaskService {

  constructor(public api: ApiService) {
    // console.log('Hello TaskService Provider');
  }

  getTaskList(uid) {
    return this.api.get('tasks/home', { uid: uid });
  }

}
