import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChange1Component } from './password-change1.component';

describe('PasswordChange1Component', () => {
  let component: PasswordChange1Component;
  let fixture: ComponentFixture<PasswordChange1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordChange1Component]
    });
    fixture = TestBed.createComponent(PasswordChange1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
