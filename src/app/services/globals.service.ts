import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LocalStorage } from 'ngx-store';
import { MessagesService } from '../messages/messages.service';

import { environment } from 'environments/environment';

@Injectable()
export class GlobalsService {
  
  public loading = false;

  constructor(
    private http: Http,
    public messagesService: MessagesService
  ) {
    // check if current token expired
    if (this.auth.exp > Date.now())
      this.logout();
  }

  public getCoordsByAddress(address: string): Observable<any> {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+address).map((response) => {
      return response.json();
    }).catch((error:any) => {
      this.messagesService.send("Kon de coordinaten niet ophalen.").subscribe();
      return Observable.throw(error.json().error || 'Error');
    });
  }

  // Authentication
  private url = environment.backendurl+'/users/';
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

    }).catch((err: Response) => Observable.throw(err.json()) );
  }

  register(email: string, name: string, password: string): Observable<boolean> {
    return this.http.post(this.url+'register', {
      email: email,
      name: name,
      password: password
      }).map((res) => {
        this.messagesService.send("Je account moet eerst goedgekeurd worden").subscribe();
        return res.json();
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
