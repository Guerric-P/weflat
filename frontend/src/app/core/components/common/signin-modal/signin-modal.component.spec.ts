import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SigninModalComponent } from './signin-modal.component';

describe('SigninModalComponent', () => {
  let component: SigninModalComponent;
  let fixture: ComponentFixture<SigninModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
