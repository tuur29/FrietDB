import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from '../messages/messages.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'


@Injectable()
export class ShopDataService {
  
  private url = '/api/shops/';

  private getShopsLastUpdate = 0;
  private getShopsLock = false;
  private cachedShops: any[];
  
  constructor(
    private http: Http,
    public globals: GlobalsService,
    public messagesService: MessagesService,
  ) {}

  public resetCache() {
  }

  public getShops(): Observable<any[]> {

    // if already cached
    if (this.cachedShops != null && Date.now() - this.getShopsLastUpdate < 1000*60*5)
      return new Observable(observer => {
        observer.next(this.cachedShops);
        observer.complete();
      });
    
    // if request in process
    if (this.getShopsLock)
      return new Observable(observer => {
        let interval = setInterval(()=>{
          if (this.cachedShops== null)
            return;

          observer.next(this.cachedShops);
          observer.complete();
          this.getShopsLock = false;
          clearInterval(interval);
        }, 100);
      });

    // get first time
    this.getShopsLock = true;
    this.globals.loading = true;
    return this.http.get(this.url+"root.json").map((response) => {
      let json = response.json();
      this.cachedShops = json;
      this.getShopsLock = false;
      this.getShopsLastUpdate = Date.now();
      this.globals.loading = false;
      return json;
    }).catch((error:any) => {
      this.globals.failed = true;
      this.messagesService.sendServerError();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public getShopsBySnacks(snacks: string[]): Observable<any[]> {
    const body = { snacks: JSON.stringify(snacks) };
    this.globals.loading = true;
    return this.http.get(this.url+"searchBySnack.json").map((response) => {
      this.globals.loading = false;
      return response.json();
    }).catch((error:any) => {
      this.globals.failed = true;
      this.messagesService.sendServerError();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public getShop(id: string): Observable<any> {
    this.globals.loading = true;
    return this.http.get(this.url+id+".json").map((response) => {
      this.globals.loading = false;
      return response.json();
    }).catch((error:any) => {
      this.globals.failed = true;
      this.messagesService.sendServerError();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public removeShop(id: string): Observable<any> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
  }

}
