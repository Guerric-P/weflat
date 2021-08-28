import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PurchaseProjectComponent } from './purchase-project.component';

describe('PurchaseProjectComponent', () => {
  let component: PurchaseProjectComponent;
  let fixture: ComponentFixture<PurchaseProjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
