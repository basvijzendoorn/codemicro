import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploretreeNodeComponent } from './exploretree-node.component';

describe('ExploretreeNodeComponent', () => {
  let component: ExploretreeNodeComponent;
  let fixture: ComponentFixture<ExploretreeNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploretreeNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploretreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
