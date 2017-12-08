import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitecteProfileComponent } from './architecte-profile.component';

describe('ArchitecteProfileComponent', () => {
  let component: ArchitecteProfileComponent;
  let fixture: ComponentFixture<ArchitecteProfileComponent>;

  beforeEach(async(() => {
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
