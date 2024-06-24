import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertInDrawerPopupComponent } from './insert-in-drawer-popup.component';

describe('InsertInDrawerPopupComponent', () => {
  let component: InsertInDrawerPopupComponent;
  let fixture: ComponentFixture<InsertInDrawerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertInDrawerPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertInDrawerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
