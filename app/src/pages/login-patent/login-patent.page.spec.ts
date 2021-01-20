import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPatentPage } from './login-patent.page';

describe('LoginPatentPage', () => {
  let component: LoginPatentPage;
  let fixture: ComponentFixture<LoginPatentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPatentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPatentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
