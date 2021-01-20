import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImagePage } from './car-image.page';

describe('CarImagePage', () => {
  let component: CarImagePage;
  let fixture: ComponentFixture<CarImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarImagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
