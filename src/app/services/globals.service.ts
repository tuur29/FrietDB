import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from 'ngx-store';

import { environment } from 'environments/environment';

@Injectable()
export class GlobalsService {
  
  public loading = false;

  // Authentication

  private readonly defaultAuth = {
    email: '',
    token: '',
    admin: false
  };

  @LocalStorage()
  private _authtoken = '';

  get auth() {
    if (this._authtoken) {
      let ob = this.parseJwt(this._authtoken);
      ob.token = this._authtoken;
      return ob;
    }
    return this.defaultAuth;
  }

  private url = environment.backendurl+'/users/';

  constructor(private http: Http) {
    // check if current token expired
    if (this.auth.exp > Date.now())
      this.logout();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post(this.url+'login', {
      email: email,
      password: password
    }).map(res => res.json()).map(res => {

      if (res.token) {
        this._authtoken = res.token;
        return true;
      }
      return false;

    });
  }

  register(email: string, name: string, password: string): Observable<boolean> {
    return this.http.post(this.url+'register', {
      email: email,
      name: name,
      password: password
      }).map(res => res.json()).map(res => {

        if (res.token) {
          this._authtoken = res.token;
          return true;
        }
        return false;

      }).catch((err: Response) => {
        return Observable.throw(err.text());
      });
  }

  logout() {
    this._authtoken = '';
  }

  private parseJwt(token) {
    if (!token) return;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}
