import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChartsComponent } from './admin-charts.component';

describe('AdminChartsComponent', () => {
  let component: AdminChartsComponent;
  let fixture: ComponentFixture<AdminChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminChartsComponent]
    });
    fixture = TestBed.createComponent(AdminChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
