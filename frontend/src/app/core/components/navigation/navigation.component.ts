import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, GuardsCheckEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthGuard } from '../../guards/auth.guard';
import { LocalStorageService } from '../../services/local-storage.service';
import { ShowSigninPopupService } from '../../services/show-signin-popup.service';
import { Constantes } from '../../../shared/common/Constantes';
import { MatDialog, MatDialogRef, MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  private routeData;
  model: any = {};
  returnUrl: string;
  disabled: boolean;
  errorMessage: string;
  routerEventsSubscription: Subscription;
  showSigninPopupSubscription: Subscription;
  @ViewChild('signinModal') signinModalTemplate: TemplateRef<any>;
  @ViewChild('signupModal') signupModalemplate: TemplateRef<any>;
  @ViewChild('expandingFooter') expandingFooter: MatExpansionPanel;
  @ViewChild('footerBody') footerBody: ElementRef;
  signinModal: MatDialogRef<any>;
  signupModal: MatDialogRef<any>;

  constructor(private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute,
    private authGuard: AuthGuard,
    private localStorageService: LocalStorageService,
    private showSigninPopupService: ShowSigninPopupService,
    private dialog: MatDialog) { }

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
      if (data instanceof GuardsCheckEnd) {
        if (!data.shouldActivate) {
          this.errorMessage = 'Vous n\'avez pas accès à cette fonctionnalité, veuillez vous connecter avec un compte approprié';
          this.displaySigninPopup();
        } else {
          this.expandingFooter.close();
        }
      }
    });

    this.showSigninPopupSubscription = this.showSigninPopupService.showSigninPopupObservable$.subscribe(x => {
      this.openSignin(this.signinModalTemplate);
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
    this.showSigninPopupSubscription.unsubscribe();
  }

  displaySigninPopup() {
    setTimeout(() => this.openSignin(this.signinModalTemplate));
  }

  get token() {
    return this.localStorageService.token;
  }

  get displayName() {
    return this.localStorageService.tokenPayload.displayName;
  }

  get menuButtonTopOffset() {
    return this.expandingFooter.expanded ? -this.footerBody.nativeElement.parentElement.getBoundingClientRect().height + 'px' : '0px';
  }

  openSignup(content) {
    this.signupModal = this.dialog.open(content);

    this.signupModal.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate([`/register/${result}`]);
      }
    }, (reason) => {

    });
  }

  openSignin(content) {
    this.signinModal = this.dialog.open(content);

    this.signinModal.afterClosed().subscribe(() => {
      this.errorMessage = null;
      this.authService.returnUrl = null;
    }, () => {
      this.errorMessage = null;
      this.authService.returnUrl = null;
    });
  }

  closeSignin() {
    this.signinModal.close();
  }

  closeSignup() {
    this.signupModal.close();
  }

  login() {
    this.disabled = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe(
        () => {
          this.signinModal.close();
          if (this.authService.returnUrl) {
            this.router.navigate([this.authService.returnUrl]);
            this.authService.returnUrl = null;
          }
        },
        () => {
          this.errorMessage = 'Erreur lors de l\'authentification';
          this.disabled = false;
        });
  }

  redirectToPersonal() {
    const role = this.localStorageService.tokenPayload.roles[0].authority;

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
      this.authGuard.canActivate(
        this.route.snapshot,
        this.router.routerState.snapshot
      )
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

