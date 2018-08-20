import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from '../messages/messages.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'


@Injectable()
export class UserDataService {
  
  private url = '/FrietDB/api/users/';
  
  constructor(
    private http: Http,
    public globals: GlobalsService,
    public messagesService: MessagesService,
  ) {}

  public getUsers(): Observable<any[]> {
    this.globals.loading = true;
    return this.http.get(this.url+"root.json", {
      headers: new Headers({Authorization: 'Bearer '+ this.globals.auth.token })
    }).map((response) => {
      this.globals.loading = false;
      return response.json();
    }).catch((error:any) => {
      this.globals.failed = true;
      this.messagesService.sendServerError();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public approveUser(id: string): Observable<any> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
  }

  public disableUser(id: string): Observable<any> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
  }

}
