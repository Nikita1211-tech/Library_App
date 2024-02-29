import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookcategorydetailComponent } from './bookcategorydetail.component';

describe('BookcategorydetailComponent', () => {
  let component: BookcategorydetailComponent;
  let fixture: ComponentFixture<BookcategorydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookcategorydetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookcategorydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
