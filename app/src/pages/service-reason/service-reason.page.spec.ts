import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceReasonPage } from './service-reason.page';

describe('ServiceReasonPage', () => {
  let component: ServiceReasonPage;
  let fixture: ComponentFixture<ServiceReasonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceReasonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceReasonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
