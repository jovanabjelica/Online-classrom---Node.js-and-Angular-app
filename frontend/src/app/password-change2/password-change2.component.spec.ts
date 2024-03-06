import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChange2Component } from './password-change2.component';

describe('PasswordChange2Component', () => {
  let component: PasswordChange2Component;
  let fixture: ComponentFixture<PasswordChange2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordChange2Component]
    });
    fixture = TestBed.createComponent(PasswordChange2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
