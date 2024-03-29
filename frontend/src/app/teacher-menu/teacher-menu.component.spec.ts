import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMenuComponent } from './teacher-menu.component';

describe('TeacherMenuComponent', () => {
  let component: TeacherMenuComponent;
  let fixture: ComponentFixture<TeacherMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherMenuComponent]
    });
    fixture = TestBed.createComponent(TeacherMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
