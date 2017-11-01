
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from 'environments/environment';

@Injectable()
export class EditDataService {

  private url = environment.backendurl+'/edits/';
  
  constructor(private http: Http) {}

  public getShopEdits(): Observable<any[]> {
    return this.http.get(this.url+"shops").map((response) =>
      response.json()
    );
  }

  public getSnackEdits(): Observable<any[]> {
    return this.http.get(this.url+"snacks").map((response) =>
      response.json()
    );
  }

  public getItem(id: string): Observable<any> {
    return this.http.get(this.url+id).map((response) =>
      response.json().item
    );
  }

  public saveEdit(type: string, item: any) {
    let data = {
      type: type,
      item: item
    };

    if (type == "shop" && item.snacks)
      item.snacks = item.snacks.map((snack) => snack.id);

    return this.http.put(this.url, data).map((response) =>
      response.json()
    );
  }


  public accept(id: any): Observable<any> {
    return this.http.post(this.url+id,'').map((response) =>
      response.json()
    );
  }

  public remove(id: any): Observable<any> {
    return this.http.delete(this.url+id).map((response) =>
      response.json()
    );
  }

}
