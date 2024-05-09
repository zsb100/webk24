import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVelemenyComponent } from './list-velemeny.component';

describe('ListVelemenyComponent', () => {
  let component: ListVelemenyComponent;
  let fixture: ComponentFixture<ListVelemenyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListVelemenyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListVelemenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
