import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalsService } from 'app/services/globals.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from 'environments/environment';

@Injectable()
export class ShopDataService {
  
  private url = environment.backendurl+'/shops/';

  private getShopsLock = false;
  private cachedShops: any[];
  
  constructor(
    private http: Http,
    public globals: GlobalsService,
  ) {}

  public getShops(): Observable<any[]> {

    // if already cached
    if (this.cachedShops != null)
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
    return this.http.get(this.url).map((response) => {
      let json = response.json();
      this.cachedShops = json;
      this.globals.loading = false;
      return json;
    });

  }

  public getShopsBySnacks(snacks: string[]): Observable<any[]> {
    const body = { snacks: JSON.stringify(snacks) };
    this.globals.loading = true;
    return this.http.post(this.url, body).map((response) => {
      this.globals.loading = false;
      return response.json();
    });
  }

  public getShop(id: string): Observable<any> {
    this.globals.loading = true;
    return this.http.get(this.url+id).map((response) => {
      this.globals.loading = false;
      return response.json();
    });
  }

}
