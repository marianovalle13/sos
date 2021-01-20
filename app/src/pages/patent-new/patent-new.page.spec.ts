import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentNewPage } from './patent-new.page';

describe('PatentNewPage', () => {
  let component: PatentNewPage;
  let fixture: ComponentFixture<PatentNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentNewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
