import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddressFieldComponent } from './address-field.component';

describe('AddressFieldComponent', () => {
  let component: AddressFieldComponent;
  let fixture: ComponentFixture<AddressFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
