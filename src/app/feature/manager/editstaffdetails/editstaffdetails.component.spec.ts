import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstaffdetailsComponent } from './editstaffdetails.component';

describe('EditstaffdetailsComponent', () => {
  let component: EditstaffdetailsComponent;
  let fixture: ComponentFixture<EditstaffdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditstaffdetailsComponent]
    });
    fixture = TestBed.createComponent(EditstaffdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
