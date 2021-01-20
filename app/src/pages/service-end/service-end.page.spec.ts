import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEndPage } from './service-end.page';

describe('ServiceEndPage', () => {
  let component: ServiceEndPage;
  let fixture: ComponentFixture<ServiceEndPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceEndPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceEndPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
