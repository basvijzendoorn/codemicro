import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFeaturesThreeComponent } from './image-features-three.component';

describe('ImageFeaturesThreeComponent', () => {
  let component: ImageFeaturesThreeComponent;
  let fixture: ComponentFixture<ImageFeaturesThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFeaturesThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFeaturesThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
