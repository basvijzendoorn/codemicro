import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteprojectdialogComponent } from './deleteprojectdialog.component';

describe('DeleteprojectdialogComponent', () => {
  let component: DeleteprojectdialogComponent;
  let fixture: ComponentFixture<DeleteprojectdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteprojectdialogComponent]
    });
    fixture = TestBed.createComponent(DeleteprojectdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
