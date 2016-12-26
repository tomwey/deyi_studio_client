import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from './api-service';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {

  user: any;

  constructor(public api: ApiService, public storage: Storage) {
    // console.log('Hello UserService Provider');
  }

  currentUser() {
    return this.storage.get('logined.user');
  }

  login(uid) {
    return this.api.post('studio/login', { sid: uid }).then(data => {
      this.storage.set('logined.user', JSON.stringify(data));
      return Promise.resolve(data);
    }, err => {
      return Promise.reject(err);
    });
  }

  getUserProfile(uid) {
    return this.api.get('studio/profile', { sid: uid });
  }
}
