import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArchitecteProfileComponent } from './architecte-profile.component';

describe('ArchitecteProfileComponent', () => {
  let component: ArchitecteProfileComponent;
  let fixture: ComponentFixture<ArchitecteProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitecteProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitecteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
