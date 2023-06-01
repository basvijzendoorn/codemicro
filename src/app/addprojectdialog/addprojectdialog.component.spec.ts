import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprojectdialogComponent } from './addprojectdialog.component';

describe('AddprojectdialogComponent', () => {
  let component: AddprojectdialogComponent;
  let fixture: ComponentFixture<AddprojectdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddprojectdialogComponent]
    });
    fixture = TestBed.createComponent(AddprojectdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
