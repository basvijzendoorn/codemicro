import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsettingsComponent } from './fieldsettings.component';

describe('FieldsettingsComponent', () => {
  let component: FieldsettingsComponent;
  let fixture: ComponentFixture<FieldsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldsettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
