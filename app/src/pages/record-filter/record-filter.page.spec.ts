import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordFilterPage } from './record-filter.page';

describe('RecordFilterPage', () => {
  let component: RecordFilterPage;
  let fixture: ComponentFixture<RecordFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
