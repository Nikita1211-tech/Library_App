import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbookcategoryComponent } from './editbookcategory.component';

describe('EditbookcategoryComponent', () => {
  let component: EditbookcategoryComponent;
  let fixture: ComponentFixture<EditbookcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditbookcategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditbookcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
