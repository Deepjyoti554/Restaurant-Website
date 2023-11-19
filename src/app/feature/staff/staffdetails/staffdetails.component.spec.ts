import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffdetailsComponent } from './staffdetails.component';

describe('StaffdetailsComponent', () => {
  let component: StaffdetailsComponent;
  let fixture: ComponentFixture<StaffdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffdetailsComponent]
    });
    fixture = TestBed.createComponent(StaffdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
