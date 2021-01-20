import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHistoryPage } from './service-history.page';

describe('ServiceHistoryPage', () => {
  let component: ServiceHistoryPage;
  let fixture: ComponentFixture<ServiceHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
