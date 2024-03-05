import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbooktypeComponent } from './editbooktype.component';

describe('EditbooktypeComponent', () => {
  let component: EditbooktypeComponent;
  let fixture: ComponentFixture<EditbooktypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditbooktypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditbooktypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
