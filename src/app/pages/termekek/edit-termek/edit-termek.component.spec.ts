import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTermekComponent } from './edit-termek.component';

describe('EditTermekComponent', () => {
  let component: EditTermekComponent;
  let fixture: ComponentFixture<EditTermekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTermekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditTermekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
