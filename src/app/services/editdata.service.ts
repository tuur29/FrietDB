import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from '../messages/messages.service';
import { ShopDataService } from 'app/services/shopdata.service';
import { SnackDataService } from 'app/services/snackdata.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from 'environments/environment';

@Injectable()
export class EditDataService {

  private url = environment.backendurl+'/edits/';
  
  constructor(
    private http: Http,
    public globals: GlobalsService,
    public messagesService: MessagesService,
    public shopDataService: ShopDataService,
    public snackDataService: SnackDataService,
  ) {}

  public getShopEdits(): Observable<any[]> {
    this.globals.loading = true;
    return this.http.get(this.url+"shops").map((response) => {
      this.globals.loading = false;
      return response.json();
    }).catch((error:any) => {
      this.messagesService.sendServerError().subscribe(() => window.location.reload());
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public getSnackEdits(): Observable<any[]> {
    this.globals.loading = true;
    return this.http.get(this.url+"snacks").map((response) => {
      this.globals.loading = false;
      return response.json();
    }).catch((error:any) => {
      this.messagesService.sendServerError().subscribe(() => window.location.reload());
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public getPendingSnacks(id: string): Observable<any[]> {
    this.globals.loading = true;
    return this.http.get(this.url+"snacks/"+id).map((response) => {
      this.globals.loading = false;
      return response.json();
    }).catch((error:any) => {
      this.messagesService.send("Gelinkte snacks konden niet worden geladen.","HERLADEN").subscribe(() => window.location.reload());
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public getItem(id: string): Observable<any> {
    this.globals.loading = true;
    return this.http.get(this.url+id).map((response) => {
      this.globals.loading = false;
      return response.json().item;
    }).catch((error:any) => {
      this.messagesService.sendServerError().subscribe(() => window.location.reload());
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public saveEdit(type: string, item: any) {
    let data = {
      type: type,
      item: item
    };

    return this.http.put(this.url, data).map((response) => 
      response.json()
    ).catch((error:any) => {
      this.messagesService.sendServerError(true).subscribe();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public accept(id: any): Observable<any> {

    return this.http.post(this.url+id,'').map((response) => {
      if (response) {
        if (response.json().snacks) // is shop
          this.shopDataService.resetCache();
        else if (response.json().usage) // is snack
          this.snackDataService.resetCache();
      }

      return response.json();
    }).catch((error:any) => {
      this.messagesService.sendServerError(true).subscribe();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public remove(id: any): Observable<any> {    
    return this.http.delete(this.url+id).map((response) =>
      response.json()
    ).catch((error:any) => {
      this.messagesService.sendServerError(true).subscribe();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

}
