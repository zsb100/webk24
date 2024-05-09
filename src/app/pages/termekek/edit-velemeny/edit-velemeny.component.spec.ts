import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVelemenyComponent } from './edit-velemeny.component';

describe('EditVelemenyComponent', () => {
  let component: EditVelemenyComponent;
  let fixture: ComponentFixture<EditVelemenyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVelemenyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditVelemenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
