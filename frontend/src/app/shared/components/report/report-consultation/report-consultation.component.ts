import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ReportClass } from '../../../../core/models/ReportClass';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../../core/services/authentication.service';

@Component({
  selector: 'app-report-consultation',
  templateUrl: './report-consultation.component.html',
  styleUrls: ['./report-consultation.component.scss']
})
export class ReportConsultationComponent implements OnInit {

  report: ReportClass;
  estimatedWorkSum = 0;

  get displayArchitectContactButton() {
    return !this.authenticationService.isArchitect;
  }

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit() {
    this.report = new ReportClass(this.route.snapshot.data['report']);

    for (const renovation of this.report.renovations) {
      this.estimatedWorkSum += renovation.estimatedWork;
    }
  }

  backClick() {
    this.location.back();
  }
}
