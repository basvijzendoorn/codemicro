import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFeaturesFourComponent } from './image-features-four.component';

describe('ImageFeaturesFourComponent', () => {
  let component: ImageFeaturesFourComponent;
  let fixture: ComponentFixture<ImageFeaturesFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageFeaturesFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFeaturesFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
