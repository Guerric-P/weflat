import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseBackendLayoutComponent } from './base-backend-layout.component';

describe('BaseBackendLayoutComponent', () => {
  let component: BaseBackendLayoutComponent;
  let fixture: ComponentFixture<BaseBackendLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseBackendLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseBackendLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
