import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from '../messages/messages.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from 'environments/environment';

@Injectable()
export class SnackDataService {
  
  private url = environment.backendurl+'/snacks/';

  private getSnacksLastUpdate = 0;
  private getSnacksLock = false;
  private cachedSnacks: any[];
  
  constructor(
    private http: Http,
    public globals: GlobalsService,
    public messagesService: MessagesService,
  ) {}

  public resetCache() {
    this.cachedSnacks = null;
  }

  public getSnacks(): Observable<any[]> {

    // if already cached
    if (this.cachedSnacks != null && Date.now() - this.getSnacksLastUpdate < 1000*60*5)
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
    this.globals.loading = true;
    return this.http.get(this.url).map((response) => {
      let json = response.json();
      this.cachedSnacks = json;
      this.getSnacksLock = false;
      this.getSnacksLastUpdate = Date.now();
      this.globals.loading = false;
      return json;
    }).catch((error:any) => {
      this.messagesService.sendServerError().subscribe(() => window.location.reload());
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public getSnack(id: string): Observable<any> {
    this.globals.loading = true;
    return this.http.get(this.url+id).map((response) => {
      this.globals.loading = false;
      return response.json();
    }).catch((error:any) => {
      this.messagesService.sendServerError().subscribe(() => window.location.reload());
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public increaseSnackUsage(id: string): Observable<any> {
    return this.http.post(this.url+id,{}).map((response) => {
      return response.json();
    });
  }

  public getSnackTypes(): Observable<string[]> {
    this.globals.loading = true;
    return this.http.get(this.url+"types").map((response) => {
      this.globals.loading = false;
      return response.json();
    }).catch((error:any) => {
      this.messagesService.sendServerError(true).subscribe();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

}
