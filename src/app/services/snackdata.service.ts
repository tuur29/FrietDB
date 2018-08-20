import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GlobalsService } from 'app/services/globals.service';
import { MessagesService } from '../messages/messages.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

@Injectable()
export class SnackDataService {
  
  private url = '/FrietDB/api/snacks/';

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
    return this.http.get(this.url+"root.json").map((response) => {
      let json = response.json();
      this.cachedSnacks = json;
      this.getSnacksLock = false;
      this.getSnacksLastUpdate = Date.now();
      this.globals.loading = false;
      return json;
    }).catch((error:any) => {
      this.globals.failed = true;
      this.messagesService.sendServerError();
      return Observable.throw(error.json().error || 'Server error');
    });
  }

  public getSnack(id: string): Observable<any> {
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

  public increaseSnackUsage(id: string): Observable<any> {
    this.messagesService.sendRemovedActionError();
    throw new Error("Action no longer supported");
  }

  public getSnackTypes(): Observable<string[]> {
    return this.http.get(this.url+"types.json").map((response) => {
      return response.json();
    }).catch((error:any) => {
      this.messagesService.sendServerError(true);
      return Observable.throw(error.json().error || 'Server error');
    });
  }

}
