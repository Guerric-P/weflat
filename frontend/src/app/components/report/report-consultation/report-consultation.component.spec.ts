import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConsultationComponent } from './report-consultation.component';

describe('ReportConsultationComponent', () => {
  let component: ReportConsultationComponent;
  let fixture: ComponentFixture<ReportConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
