import { Component, OnInit } from '@angular/core';
import { DashboardClass } from '@weflat/app/core/models/DashboardClass';
import { AuthenticationService } from '@weflat/app/core/services/authentication.service';
import { ArchitectService } from '@weflat/app/shared/services/architecte.service';

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
