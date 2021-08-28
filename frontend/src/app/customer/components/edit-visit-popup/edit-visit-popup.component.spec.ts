import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditVisitPopupComponent } from './edit-visit-popup.component';

describe('EditVisitPopupComponent', () => {
  let component: EditVisitPopupComponent;
  let fixture: ComponentFixture<EditVisitPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVisitPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVisitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
