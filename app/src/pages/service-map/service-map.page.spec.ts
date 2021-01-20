import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMapPage } from './service-map.page';

describe('ServiceMapPage', () => {
  let component: ServiceMapPage;
  let fixture: ComponentFixture<ServiceMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
