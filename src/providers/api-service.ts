import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Md5 } from 'ts-md5/dist/md5';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

const API_HOST: string = "http://10.0.16.54:3000/api/v1";
const API_KEY:  string = "4f8649737bc94fe68c29b1b138eba483";

@Injectable()
export class ApiService {

  constructor(public http: Http) {}

  // 处理POST请求
  get(uri, params) {
    let url = API_HOST + '/' + uri;

    let i = new Date().getTime();
    // console.log(this.generateAccessKey(i));

    let searchParams = new URLSearchParams();
    searchParams.set('i', i.toString());
    searchParams.set('ak', this.generateAccessKey(i));

    for (let param in params) {
      searchParams.set(param, params[param]);
    }

    return this.http.get(url, new RequestOptions({ search: searchParams }))
      .toPromise()
      .then(this.handleSuccess)
      .catch(this.handleError);
      // .map(this.handleSuccess)
      // .catch(this.handleError);
  }

  // 处理POST请求
  post(uri, params) {
    let url = API_HOST + '/' + uri;

    let i = new Date().getTime();
    let ak = this.generateAccessKey(i);

    params.i = i;
    params.ak = ak;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let reqOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, JSON.stringify(params), reqOptions)
        .toPromise()
        .then(this.handleSuccess)
        .catch(this.handleError);
      // .map(this.handleSuccess)
      // .catch(this.handleError);
  }

  private generateAccessKey(i): string {
    return Md5.hashStr(API_KEY + i.toString(), false).toString();
  }

  private handleSuccess(res: Response) {
    let body = res.json();
    if (body.code == 0) {
      return body.data || {};
    } else {
      return Promise.reject(body.message);
    }
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Promise.reject(errMsg);
  }
}
