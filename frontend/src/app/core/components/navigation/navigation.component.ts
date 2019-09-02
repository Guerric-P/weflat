import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatExpansionPanel } from '@angular/material';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { SigninModalComponent } from '@weflat/core/components/common/signin-modal/signin-modal.component';
import { SignupModalComponent } from '@weflat/core/components/common/signup-modal/signup-modal.component';
import { AuthenticationService } from '@weflat/core/services/authentication.service';
import { ShowSigninPopupService } from '@weflat/core/services/show-signin-popup.service';
import { Constantes } from '@weflat/shared/common/Constantes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private routeData;
  returnUrl: string;
  disabled: boolean;
  routerEventsSubscription: Subscription;
  showSigninPopupSubscription: Subscription;
  @ViewChild('expandingFooter', { static: false }) expandingFooter: MatExpansionPanel;
  @ViewChild('footerBody', { static: false }) footerBody: ElementRef;
  signinModal: MatDialogRef<any>;
  signupModal: MatDialogRef<any>;

  constructor(
    private authService: AuthenticationService,
    private router: Router, private showSigninPopupService: ShowSigninPopupService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    if (this.authService.returnUrl) {
      this.router.navigate([this.authService.returnUrl]);
    }

    this.routerEventsSubscription = this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.routeData = data.state.root.firstChild.data;
        if (this.signinModal) { this.signinModal.close(); }
        if (this.signupModal) { this.signupModal.close(); }
      }
      if (data instanceof NavigationEnd) {
        this.expandingFooter.close();
      }
    });

    this.showSigninPopupSubscription = this.showSigninPopupService.showSigninPopupObservable$.subscribe(() => {
      this.openSignin();
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
    this.showSigninPopupSubscription.unsubscribe();
  }

  displaySigninPopup() {
    setTimeout(() => this.openSignin());
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  get displayName() {
    return this.authService.displayName;
  }

  get menuButtonTopOffset() {
    return this.expandingFooter.expanded ? -this.footerBody.nativeElement.parentElement.getBoundingClientRect().height + 'px' : '0px';
  }

  openSignup() {
    this.signupModal = this.dialog.open(SignupModalComponent);
  }

  openSignin() {
    this.signinModal = this.dialog.open(SigninModalComponent);
  }

  redirectToPersonal() {
    const role = this.authService.tokenPayload.roles[0].authority;

    switch (role) {
      case Constantes.ROLE_ACHETEUR:
        this.router.navigate(['/acheteur']);
        break;
      case Constantes.ROLE_ARCHITECTE:
        this.router.navigate(['/architecte']);
        break;
      case Constantes.ROLE_ADMIN:
        this.router.navigate(['/admin']);
        break;
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.redirectIfAuthRequired();
    }, () => {
      this.redirectIfAuthRequired();
    });
  }

  redirectIfAuthRequired() {
    if (this.routeData && this.routeData.authRequired) {
      this.router.navigate(['/']);
    }
  }

  toggleFooter() {
    if (this.expandingFooter.expanded) {
      this.expandingFooter.close();
    } else {
      this.expandingFooter.open();
    }
  }
}

