import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from '../messages/messages.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import { environment } from 'environments/environment';

@Injectable()
export class UserDataService {
  
  private url = environment.backendurl+'/users/';
  
  constructor(
    private http: Http,
    public globals: GlobalsService,
    public messagesService: MessagesService,
  ) {}

  public getUsers(): Observable<any[]> {
    this.globals.loading = true;
    return this.http.get(this.url, {
      headers: new Headers({Authorization: 'Bearer '+ this.globals.auth.token })
    }).map((response) => {
      this.globals.loading = false;
      return response.json();
    }).catch((error:any) => {
      this.globals.failed = true;
      this.messagesService.sendServerError().subscribe(() => window.location.reload());
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public approveUser(id: string): Observable<any> {
    return this.http.post(this.url+id,{}, {
      headers: new Headers({Authorization: 'Bearer '+ this.globals.auth.token })
    }).map((response) => {
      return response.json();
    });
  }

  public disableUser(id: string): Observable<any> {
    return this.http.delete(this.url+id, {
      headers: new Headers({Authorization: 'Bearer '+ this.globals.auth.token })
    }).map((response) => {
      return response.json();
    });
  }

}
