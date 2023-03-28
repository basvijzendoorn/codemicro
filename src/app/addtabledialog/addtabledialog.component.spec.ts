import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtabledialogComponent } from './addtabledialog.component';

describe('AddtabledialogComponent', () => {
  let component: AddtabledialogComponent;
  let fixture: ComponentFixture<AddtabledialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtabledialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtabledialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
