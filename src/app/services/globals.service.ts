import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';

@Injectable()
export class GlobalsService {

  constructor(private localStorageService: LocalStorageService) {
    this.auth = localStorageService.get('auth') || this.auth;
  }

  loading = false;

  auth = {
    token: 'temp',
    admin: true,
  };

  title: string;

  defaultLat: number = 50.5039;
  defaultLng: number = 4.4699;

}
