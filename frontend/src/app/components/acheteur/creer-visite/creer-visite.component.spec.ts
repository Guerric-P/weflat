import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerVisiteComponent } from './creer-visite.component';

describe('CreerVisiteComponent', () => {
  let component: CreerVisiteComponent;
  let fixture: ComponentFixture<CreerVisiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreerVisiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
