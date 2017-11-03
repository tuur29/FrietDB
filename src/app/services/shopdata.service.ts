import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalsService } from 'app/services/globals.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from 'environments/environment';

@Injectable()
export class ShopDataService {
  
  private url = environment.backendurl+'/shops/';

  private cachedShopsList: any[];
  
  constructor(
    private http: Http,
    public globals: GlobalsService,
  ) {}

  public getShops(): Observable<any[]> {
    return this.http.get(this.url).map((response) =>
      response.json()
    );
  }

  public getShopsBySnacks(snacks: string[]): Observable<any[]> {
    const body = { snacks: JSON.stringify(snacks) };
    return this.http.post(this.url, body).map((response) =>
      response.json()
    );
  }

  public getShop(id: string): Observable<any> {
    return this.http.get(this.url+id).map((response) =>
      response.json()
    );
  }

}
