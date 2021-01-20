import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentPicPage } from './patent-pic.page';

describe('PatentPicPage', () => {
  let component: PatentPicPage;
  let fixture: ComponentFixture<PatentPicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentPicPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentPicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
