import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploretreeComponent } from './exploretree.component';

describe('ExploretreeComponent', () => {
  let component: ExploretreeComponent;
  let fixture: ComponentFixture<ExploretreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploretreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploretreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
