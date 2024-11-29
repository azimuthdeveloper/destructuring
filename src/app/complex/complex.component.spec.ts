import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexComponent } from './complex.component';

describe('ComplexComponent', () => {
  let component: ComplexComponent;
  let fixture: ComponentFixture<ComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
