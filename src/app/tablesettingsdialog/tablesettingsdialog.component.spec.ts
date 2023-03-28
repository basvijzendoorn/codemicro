import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesettingsdialogComponent } from './tablesettingsdialog.component';

describe('TablesettingsdialogComponent', () => {
  let component: TablesettingsdialogComponent;
  let fixture: ComponentFixture<TablesettingsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesettingsdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesettingsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
