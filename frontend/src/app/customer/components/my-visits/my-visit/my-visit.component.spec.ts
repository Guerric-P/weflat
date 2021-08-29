import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyVisitComponent } from './my-visit.component';

describe('MyVisitComponent', () => {
  let component: MyVisitComponent;
  let fixture: ComponentFixture<MyVisitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
