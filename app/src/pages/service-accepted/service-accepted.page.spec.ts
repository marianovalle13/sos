import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAcceptedPage } from './service-accepted.page';

describe('ServiceAcceptedPage', () => {
  let component: ServiceAcceptedPage;
  let fixture: ComponentFixture<ServiceAcceptedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAcceptedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAcceptedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
