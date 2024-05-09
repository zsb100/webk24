import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEkszerComponent } from './add-ekszer.component';

describe('AddEkszerComponent', () => {
  let component: AddEkszerComponent;
  let fixture: ComponentFixture<AddEkszerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEkszerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEkszerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
