import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectsListComponent } from './architects-list.component';

describe('ArchitectsListComponent', () => {
  let component: ArchitectsListComponent;
  let fixture: ComponentFixture<ArchitectsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
