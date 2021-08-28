import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZipCodeComponent } from './zip-code.component';

describe('ZipCodeComponent', () => {
  let component: ZipCodeComponent;
  let fixture: ComponentFixture<ZipCodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
