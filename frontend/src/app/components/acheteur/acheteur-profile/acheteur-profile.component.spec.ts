import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheteurProfileComponent } from './acheteur-profile.component';

describe('AcheteurProfileComponent', () => {
  let component: AcheteurProfileComponent;
  let fixture: ComponentFixture<AcheteurProfileComponent>;

  beforeEach(async(() => {
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
