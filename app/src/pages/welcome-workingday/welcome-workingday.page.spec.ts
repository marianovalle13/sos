import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeWorkingdayPage } from './welcome-workingday.page';

describe('WelcomeWorkingdayPage', () => {
  let component: WelcomeWorkingdayPage;
  let fixture: ComponentFixture<WelcomeWorkingdayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeWorkingdayPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeWorkingdayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
