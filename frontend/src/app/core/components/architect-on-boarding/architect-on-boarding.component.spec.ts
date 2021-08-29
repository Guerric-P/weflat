import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArchitectOnBoardingComponent } from './architect-on-boarding.component';

describe('ArchitectOnBoardingComponent', () => {
  let component: ArchitectOnBoardingComponent;
  let fixture: ComponentFixture<ArchitectOnBoardingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectOnBoardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectOnBoardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
