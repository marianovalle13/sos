import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakenImagesPage } from './taken-images.page';

describe('TakenImagesPage', () => {
  let component: TakenImagesPage;
  let fixture: ComponentFixture<TakenImagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakenImagesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakenImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
