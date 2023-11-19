import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerdialogComponent } from './managerdialog.component';

describe('ManagerdialogComponent', () => {
  let component: ManagerdialogComponent;
  let fixture: ComponentFixture<ManagerdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerdialogComponent]
    });
    fixture = TestBed.createComponent(ManagerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
