import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFeaturesTwoComponent } from './image-features-two.component';

describe('ImageFeaturesTwoComponent', () => {
  let component: ImageFeaturesTwoComponent;
  let fixture: ComponentFixture<ImageFeaturesTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFeaturesTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFeaturesTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
