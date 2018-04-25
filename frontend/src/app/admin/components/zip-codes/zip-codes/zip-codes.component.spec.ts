import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipCodesComponent } from './zip-codes.component';

describe('ZipCodesComponent', () => {
  let component: ZipCodesComponent;
  let fixture: ComponentFixture<ZipCodesComponent>;

  beforeEach(async(() => {
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
