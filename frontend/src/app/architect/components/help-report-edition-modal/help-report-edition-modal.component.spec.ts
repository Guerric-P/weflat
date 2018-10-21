import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpReportEditionModalComponent } from './help-report-edition-modal.component';

describe('HelpReportEditionModalComponent', () => {
  let component: HelpReportEditionModalComponent;
  let fixture: ComponentFixture<HelpReportEditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpReportEditionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpReportEditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
