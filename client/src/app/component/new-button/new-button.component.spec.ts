import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewButtonComponent } from './new-button.component';

describe('NewButtonComponent', () => {
  let component: NewButtonComponent;
  let fixture: ComponentFixture<NewButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
