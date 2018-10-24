import { Component, OnInit } from '@angular/core';
import { ArchitectService } from '../../../shared/services/architecte.service';
import { DashboardClass } from '../../../core/models/DashboardClass';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboard: DashboardClass = new DashboardClass();

  constructor(
    private architectService: ArchitectService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.architectService.getDashboard(this.authService.userId).subscribe(res => {
      this.dashboard = res;
    });
  }

}
