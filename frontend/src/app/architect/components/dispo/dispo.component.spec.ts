import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispoComponent } from './dispo.component';

describe('DispoComponent', () => {
  let component: DispoComponent;
  let fixture: ComponentFixture<DispoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
