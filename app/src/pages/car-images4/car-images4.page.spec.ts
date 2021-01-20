import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImages4Page } from './car-images4.page';

describe('CarImages4Page', () => {
  let component: CarImages4Page;
  let fixture: ComponentFixture<CarImages4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarImages4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarImages4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
