import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledZipCodePopupComponent } from './disabled-zip-code-popup.component';

describe('DisabledZipCodePopupComponent', () => {
  let component: DisabledZipCodePopupComponent;
  let fixture: ComponentFixture<DisabledZipCodePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledZipCodePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledZipCodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
