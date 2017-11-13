import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';

@Injectable()
export class GlobalsService {
  
  loading = false;

  constructor(private localStorageService: LocalStorageService) {
    this.auth = localStorageService.get('auth') || this.auth;
  }

  auth = {
    token: 'temp',
    admin: true,
  };

}
