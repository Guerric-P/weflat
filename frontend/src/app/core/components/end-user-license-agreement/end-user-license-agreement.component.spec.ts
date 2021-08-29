import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EndUserLicenseAgreementComponent } from './end-user-license-agreement.component';

describe('EndUserLicenseAgreementComponent', () => {
  let component: EndUserLicenseAgreementComponent;
  let fixture: ComponentFixture<EndUserLicenseAgreementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EndUserLicenseAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndUserLicenseAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
