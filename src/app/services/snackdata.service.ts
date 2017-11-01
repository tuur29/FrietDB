
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from 'environments/environment';

@Injectable()
export class SnackDataService {
  
  private url = environment.backendurl+'/snacks/';
  
  constructor(private http: Http) {}

  public getSnacks(): Observable<any[]> {
    return this.http.get(this.url).map((response) =>
      response.json()
    );
  }

  public getSnack(id: string): Observable<any> {
    return this.http.get(this.url+id).map((response) =>
      response.json()
    );
  }

  public getSnackTypes(): Observable<string[]> {
    return this.http.get(this.url+"types").map((response) =>
      response.json()
    );
  }

}
