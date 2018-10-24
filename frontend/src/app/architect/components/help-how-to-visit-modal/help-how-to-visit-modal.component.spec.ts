import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpHowToVisitModalComponent } from './help-how-to-visit-modal.component';

describe('HelpHowToVisitModalComponent', () => {
  let component: HelpHowToVisitModalComponent;
  let fixture: ComponentFixture<HelpHowToVisitModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpHowToVisitModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpHowToVisitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
