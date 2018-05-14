import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectComponent } from './architect.component';

describe('ArchitectComponent', () => {
  let component: ArchitectComponent;
  let fixture: ComponentFixture<ArchitectComponent>;

  beforeEach(async(() => {
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
