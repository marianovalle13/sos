import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusChangePage } from './status-change.page';

describe('StatusChangePage', () => {
  let component: StatusChangePage;
  let fixture: ComponentFixture<StatusChangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusChangePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusChangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
