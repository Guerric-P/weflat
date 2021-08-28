import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZipCodesComponent } from './zip-codes.component';

describe('ZipCodesComponent', () => {
  let component: ZipCodesComponent;
  let fixture: ComponentFixture<ZipCodesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
