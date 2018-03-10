import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { VisiteCounterService } from '../../../architect/services/visite-counter.service';
import { VisiteService } from '../../../shared/services/visite.service';

@Component({
  selector: 'app-base-backend-layout',
  templateUrl: './base-backend-layout.component.html',
  styleUrls: ['./base-backend-layout.component.scss']
})
export class BaseBackendLayoutComponent implements OnInit {
  constructor(protected authService: AuthenticationService,
    protected router: Router, protected route: ActivatedRoute,
    protected authGuard: AuthGuard,
    protected modalService: NgbModal,
    protected localStorageService: LocalStorageService,
    protected visiteService: VisiteService,
    protected visiteCounterService: VisiteCounterService) {;
 }

    authRequired;
    visiteCounter: number;
    leftMenuHidden: boolean = true;
  
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
  
    get token() {
      return this.localStorageService.token;
    }
  
    get displayName() {
      return this.localStorageService.tokenPayload ? this.localStorageService.tokenPayload.displayName : null;
    }
  
    open(content) {
      this.modalService.open(content).result.then((result) => {
        this.router.navigate([`/register/${result}`]);;
      });
    }
  
    logout() {
  
      this.authService.logout().subscribe(res => {
        this.redirectIfAuthRequired();
      }, err => {
        this.redirectIfAuthRequired();
      });
      
    }

    redirectIfAuthRequired() {
      if (this.authRequired) {
        this.authGuard.canActivate(
          this.route.snapshot,
          this.router.routerState.snapshot
        )
      }
    }
  
    dismissLeftMenu(){
      this.leftMenuHidden = true;
    }
  
    showLeftMenu(){
      this.leftMenuHidden = false;
    }

    scrollToTop(){
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }


}
