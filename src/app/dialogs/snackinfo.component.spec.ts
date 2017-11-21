import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackInfoDialog } from './snackinfo.component';

describe('SnackInfoDialog', () => {
  let component: SnackInfoDialog;
  let fixture: ComponentFixture<SnackInfoDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackInfoDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackInfoDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});