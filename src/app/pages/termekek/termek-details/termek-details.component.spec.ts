import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekDetailsComponent } from './termek-details.component';

describe('TermekDetailsComponent', () => {
  let component: TermekDetailsComponent;
  let fixture: ComponentFixture<TermekDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermekDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermekDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
