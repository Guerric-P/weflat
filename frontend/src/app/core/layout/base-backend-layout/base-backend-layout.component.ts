import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { AuthenticationService } from '@weflat/app/core/services/authentication.service';
import { VisiteCounterService } from '@weflat/app/core/services/visite-counter.service';
import { VisitService } from '@weflat/app/shared/services/visit.service';

@Component({
  selector: 'app-base-backend-layout',
  templateUrl: './base-backend-layout.component.html',
  styleUrls: ['./base-backend-layout.component.scss']
})
export class BaseBackendLayoutComponent implements OnInit {

  authRequired;
  visiteCounter: number;
  leftMenuHidden = true;

  constructor(protected authService: AuthenticationService,
    protected router: Router, protected route: ActivatedRoute,
    protected visiteService: VisitService,
    protected visiteCounterService: VisiteCounterService) {
  }

  ngOnInit() {
    this.authRequired = this.router.routerState.root.firstChild.data;
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.setAuthRequired(data.state.root.firstChild.data);
        this.leftMenuHidden = true;
      }
    });
  }

  setAuthRequired(data) {
    this.authRequired = data && data.authRequired ? true : false;
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get displayName() {
    return this.authService.displayName;
  }

  logout() {

    this.authService.logout().subscribe(() => {
      this.redirectIfAuthRequired();
    }, () => {
      this.redirectIfAuthRequired();
    });

  }

  redirectIfAuthRequired() {
    if (this.authRequired) {
      this.router.navigate(['/']);
    }
  }

  dismissLeftMenu() {
    this.leftMenuHidden = true;
  }

  showLeftMenu() {
    this.leftMenuHidden = false;
  }

  scrollToTop() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }


}
