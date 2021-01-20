import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImagesPage } from './car-images.page';

describe('CarImagesPage', () => {
  let component: CarImagesPage;
  let fixture: ComponentFixture<CarImagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarImagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
