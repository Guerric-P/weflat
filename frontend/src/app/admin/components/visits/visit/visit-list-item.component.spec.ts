import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisitListItemComponent } from './visit-list-item.component';

describe('VisitComponent', () => {
  let component: VisitListItemComponent;
  let fixture: ComponentFixture<VisitListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
