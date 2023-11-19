import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersidebarComponent } from './managersidebar.component';

describe('ManagersidebarComponent', () => {
  let component: ManagersidebarComponent;
  let fixture: ComponentFixture<ManagersidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagersidebarComponent]
    });
    fixture = TestBed.createComponent(ManagersidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
