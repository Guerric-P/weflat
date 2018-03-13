import { Component, OnInit } from '@angular/core';
import { ReportClass } from '../../../../core/models/ReportClass';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-consultation',
  templateUrl: './report-consultation.component.html',
  styleUrls: ['./report-consultation.component.scss']
})
export class ReportConsultationComponent implements OnInit {

  report: ReportClass;
  estimatedWorkSum: number = 0;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.report = new ReportClass(this.route.snapshot.data['report']);

    for(let renovation of this.report.renovations) {
      this.estimatedWorkSum += renovation.estimatedWork;
    }
  }
}
