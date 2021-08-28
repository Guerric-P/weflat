import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArchitectsComponent } from './architects.component';

describe('ArchitectsComponent', () => {
  let component: ArchitectsComponent;
  let fixture: ComponentFixture<ArchitectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
