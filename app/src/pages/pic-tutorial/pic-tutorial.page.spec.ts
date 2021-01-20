import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicTutorialPage } from './pic-tutorial.page';

describe('PicTutorialPage', () => {
  let component: PicTutorialPage;
  let fixture: ComponentFixture<PicTutorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicTutorialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicTutorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
