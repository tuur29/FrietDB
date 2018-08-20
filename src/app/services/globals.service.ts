import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { LocalStorage } from 'ngx-store';
import { MessagesService } from '../messages/messages.service';


@Injectable()
export class GlobalsService {
  
  public loading = false;
  public failed = false;

  constructor(
    public messagesService: MessagesService
  ) { }

  public getCoordsByAddress(address: string): Observable<any> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
  }

  public uploadToImgur(payload): Observable<any> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
  }

  public deleteFromImgur(hash: string): Observable<any> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
  }

  // Authentication
  private readonly defaultAuth = {
    email: '',
    token: '',
    admin: false
  };

  private readonly userAuth = {
    email: 'user@domain.com',
    token: 'token',
    admin: false
  };

  private readonly adminAuth = {
    email: 'admin@domain.com',
    token: 'token',
    admin: true
  };

  @LocalStorage()
  private _authtoken = '';

  get auth() {
    if (this._authtoken) {
      if (this._authtoken == "user") return this.userAuth;
      else return this.adminAuth;
    }
    return this.defaultAuth;
  }

  login(email: string, password: string): Observable<boolean> {
    if (email == "admin@domain.com" && password=="password12") {
      this._authtoken = 'admin';
      return Observable.of(true);
    } else if (email == "user@domain.com" && password=="password12") {
      this._authtoken = 'user';
      return Observable.of(true);
    }
    return Observable.throw({message: "Verkeerd e-mailadres of wachtwoord"});
  }

  register(email: string, name: string, password: string): Observable<boolean> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
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
