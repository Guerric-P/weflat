import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateVisitComponent } from './create-visit.component';

describe('CreateVisitComponent', () => {
  let component: CreateVisitComponent;
  let fixture: ComponentFixture<CreateVisitComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
