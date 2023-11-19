import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffnavbarComponent } from './staffnavbar.component';

describe('StaffnavbarComponent', () => {
  let component: StaffnavbarComponent;
  let fixture: ComponentFixture<StaffnavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffnavbarComponent]
    });
    fixture = TestBed.createComponent(StaffnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
