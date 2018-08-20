import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from '../messages/messages.service';
import { ShopDataService } from 'app/services/shopdata.service';
import { SnackDataService } from 'app/services/snackdata.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'


@Injectable()
export class EditDataService {

  private url = '/api/edits/';
  
  constructor(
    private http: Http,
    public globals: GlobalsService,
    public messagesService: MessagesService,
    public shopDataService: ShopDataService,
    public snackDataService: SnackDataService,
  ) {}

  public getShopEdits(): Observable<any[]> {
    this.globals.loading = true;
    return this.http.get(this.url+"shops.json", {
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

  public getSnackEdits(): Observable<any[]> {
    this.globals.loading = true;
    return this.http.get(this.url+"snacks.json", {
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

  public getPendingSnacks(id: string): Observable<any[]> {
    this.globals.loading = true;
    return this.http.get(this.url+"snacks/"+id+".json", {
      headers: new Headers({Authorization: 'Bearer '+ this.globals.auth.token })
    }).map((response) => {
      this.globals.loading = false;
      return response.json();
    }).catch((error:any) => {
      this.messagesService.sendServerError();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public getItem(id: string): Observable<any> {
    this.globals.loading = true;
    return this.http.get(this.url+id+".json", {
      headers: new Headers({Authorization: 'Bearer '+ this.globals.auth.token })
    }).map((response) => {
      this.globals.loading = false;
      return response.json().item;
    }).catch((error:any) => {
      this.globals.failed = true;
      this.messagesService.sendServerError();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public saveEdit(type: string, item: any): Observable<any> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
  }

  public accept(id: any): Observable<any> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
  }

  public remove(id: any): Observable<any> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
  }

}
