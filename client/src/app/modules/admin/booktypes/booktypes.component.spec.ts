import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooktypesComponent } from './booktypes.component';

describe('BooktypesComponent', () => {
  let component: BooktypesComponent;
  let fixture: ComponentFixture<BooktypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooktypesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooktypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
