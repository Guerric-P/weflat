import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVisitComponent } from './my-visit.component';

describe('MyVisitComponent', () => {
  let component: MyVisitComponent;
  let fixture: ComponentFixture<MyVisitComponent>;

  beforeEach(async(() => {
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
