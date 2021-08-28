import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArchitectComponent } from './architect.component';

describe('ArchitectComponent', () => {
  let component: ArchitectComponent;
  let fixture: ComponentFixture<ArchitectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
