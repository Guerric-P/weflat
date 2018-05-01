import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectDetailComponent } from './architect-detail.component';

describe('ArchitectDetailComponent', () => {
  let component: ArchitectDetailComponent;
  let fixture: ComponentFixture<ArchitectDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
