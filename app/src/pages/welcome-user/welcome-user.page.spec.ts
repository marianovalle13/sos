import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeUserPage } from './welcome-user.page';

describe('WelcomeUserPage', () => {
  let component: WelcomeUserPage;
  let fixture: ComponentFixture<WelcomeUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
