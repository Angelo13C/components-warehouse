import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemTagPopupComponent } from './new-item-tag-popup.component';

describe('NewItemTagPopupComponent', () => {
  let component: NewItemTagPopupComponent;
  let fixture: ComponentFixture<NewItemTagPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewItemTagPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewItemTagPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
