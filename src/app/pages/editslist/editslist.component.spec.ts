import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsListComponent } from './editslist.component';

describe('EditsListComponent', () => {
  let component: EditsListComponent;
  let fixture: ComponentFixture<EditsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});