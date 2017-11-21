import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSnackDialog } from './editsnack.component';

describe('EditSnackDialog', () => {
  let component: EditSnackDialog;
  let fixture: ComponentFixture<EditSnackDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSnackDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSnackDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});