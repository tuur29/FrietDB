import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';

@Injectable()
export class GlobalsService {

  constructor(private localStorageService: LocalStorageService) {
    this.auth = localStorageService.get('auth') || this.auth;
  }

  auth = {
    token: 'temp',
    admin: true,
  };

  title: string;

  defaultLat: number = 51.723858;
  defaultLng: number = 7.895982;

}
