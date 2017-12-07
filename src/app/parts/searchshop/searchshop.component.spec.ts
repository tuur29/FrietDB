import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';

import { AppModule } from '../../app.module';
import { SearchShopModule } from './searchshop.module';
import { SearchShopComponent } from './searchshop.component';

describe('SearchShopComponent', () => {
  let component: SearchShopComponent;
  let fixture: ComponentFixture<SearchShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, SearchShopModule ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});