import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeprojectdialogComponent } from './changeprojectdialog.component';

describe('ChangeprojectdialogComponent', () => {
  let component: ChangeprojectdialogComponent;
  let fixture: ComponentFixture<ChangeprojectdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeprojectdialogComponent]
    });
    fixture = TestBed.createComponent(ChangeprojectdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
