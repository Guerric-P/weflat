import { Component, OnInit } from '@angular/core';
import { DashboardClass } from '@weflat/core/models/DashboardClass';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { ArchitectService } from '@weflat/shared/services/architecte.service';

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
