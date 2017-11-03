import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from 'environments/environment';

@Injectable()
export class SnackDataService {
  
  private url = environment.backendurl+'/snacks/';

  private getSnacksLock = false;
  private cachedSnacks: any[];
  
  constructor(private http: Http) {}

  public getSnacks(): Observable<any[]> {

    // if already cached
    if (this.cachedSnacks != null)
      return new Observable(observer => {
        observer.next(this.cachedSnacks);
        observer.complete();
      });
    
    // if request in process
    if (this.getSnacksLock)
      return new Observable(observer => {
        let interval = setInterval(()=>{
          if (this.cachedSnacks== null)
            return;

          observer.next(this.cachedSnacks);
          observer.complete();
          this.getSnacksLock = false;
          clearInterval(interval);
        }, 100);
      });

    // get first time
    this.getSnacksLock = true;
    return this.http.get(this.url).map((response) => {
      let json = response.json();
      this.cachedSnacks = json;
      return json;
    });
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
