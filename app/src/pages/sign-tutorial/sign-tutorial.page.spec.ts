import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignTutorialPage } from './sign-tutorial.page';

describe('SignTutorialPage', () => {
  let component: SignTutorialPage;
  let fixture: ComponentFixture<SignTutorialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignTutorialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignTutorialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
