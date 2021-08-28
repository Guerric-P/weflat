import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcheteurProfileComponent } from './acheteur-profile.component';

describe('AcheteurProfileComponent', () => {
  let component: AcheteurProfileComponent;
  let fixture: ComponentFixture<AcheteurProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AcheteurProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcheteurProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
