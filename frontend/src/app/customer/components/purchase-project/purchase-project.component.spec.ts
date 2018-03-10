import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseProjectComponent } from './purchase-project.component';

describe('PurchaseProjectComponent', () => {
  let component: PurchaseProjectComponent;
  let fixture: ComponentFixture<PurchaseProjectComponent>;

  beforeEach(async(() => {
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
