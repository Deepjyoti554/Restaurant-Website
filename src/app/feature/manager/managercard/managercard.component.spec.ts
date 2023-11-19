import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagercardComponent } from './managercard.component';

describe('ManagercardComponent', () => {
  let component: ManagercardComponent;
  let fixture: ComponentFixture<ManagercardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagercardComponent]
    });
    fixture = TestBed.createComponent(ManagercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
