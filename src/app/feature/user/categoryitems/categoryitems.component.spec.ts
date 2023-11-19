import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryitemsComponent } from './categoryitems.component';

describe('CategoryitemsComponent', () => {
  let component: CategoryitemsComponent;
  let fixture: ComponentFixture<CategoryitemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryitemsComponent]
    });
    fixture = TestBed.createComponent(CategoryitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
