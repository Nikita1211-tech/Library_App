import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooktypedetailComponent } from './booktypedetail.component';

describe('BooktypedetailComponent', () => {
  let component: BooktypedetailComponent;
  let fixture: ComponentFixture<BooktypedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooktypedetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooktypedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
