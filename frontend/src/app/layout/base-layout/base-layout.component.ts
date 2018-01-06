import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'app/services/local-storage.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  constructor(protected authService: AuthenticationService,
    protected router: Router, protected route: ActivatedRoute,
    protected authGuard: AuthGuard,
    protected modalService: NgbModal,
    protected localStorageService: LocalStorageService) { }

    protected authRequired;
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
      return this.localStorageService.tokenPayload.displayName;
    }
  
    open(content) {
      this.modalService.open(content).result.then((result) => {
        this.router.navigate([`/register/${result}`]);;
      });
    }
  
    logout() {
  
      this.authService.logout();
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
