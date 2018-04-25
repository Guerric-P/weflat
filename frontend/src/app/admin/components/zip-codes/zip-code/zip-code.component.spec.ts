import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipCodeComponent } from './zip-code.component';

describe('ZipCodeComponent', () => {
  let component: ZipCodeComponent;
  let fixture: ComponentFixture<ZipCodeComponent>;

  beforeEach(async(() => {
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
