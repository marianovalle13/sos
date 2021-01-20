import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckImagesPage } from './check-images.page';

describe('CheckImagesPage', () => {
  let component: CheckImagesPage;
  let fixture: ComponentFixture<CheckImagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckImagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
