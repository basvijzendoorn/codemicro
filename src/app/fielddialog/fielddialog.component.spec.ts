import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FielddialogComponent } from './fielddialog.component';

describe('fielddialogComponent', () => {
  let component: FielddialogComponent;
  let fixture: ComponentFixture<FielddialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FielddialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FielddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
