import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'app/services/local-storage.service';
import { VisiteService } from 'app/services/visite.service';
import { VisiteCounterService } from 'app/services/visite-counter.service';

@Component({
  selector: 'app-architecte-layout',
  templateUrl: './architecte-layout.component.html',
  styleUrls: ['./architecte-layout.component.css']
})
export class ArchitecteLayoutComponent implements OnInit {
  constructor(private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute,
    private authGuard: AuthGuard,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private visiteService: VisiteService,
    private visiteCounterService: VisiteCounterService) { }

    authRequired;
    visiteCounter: number;
    leftMenuHidden: boolean = true;
  
    ngOnInit() {
      this.authRequired = this.router.routerState.root.firstChild.data;
      this.router.events.subscribe((data) => {
        if (data instanceof RoutesRecognized) {
          this.setAuthRequired(data.state.root.firstChild.data);
          this.leftMenuHidden = true;
          this.visiteCounterService.announceCount();
        }
      });
      this.visiteService.getVisiteCounter().subscribe(res => {
        this.visiteCounter = res;
      });
      this.visiteCounterService.counterChanged$.subscribe(res => {
        this.visiteCounter = res;
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
