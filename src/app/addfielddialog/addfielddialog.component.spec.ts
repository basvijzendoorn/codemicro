import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfielddialogComponent } from './addfielddialog.component';

describe('AddfielddialogComponent', () => {
  let component: AddfielddialogComponent;
  let fixture: ComponentFixture<AddfielddialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfielddialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfielddialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
