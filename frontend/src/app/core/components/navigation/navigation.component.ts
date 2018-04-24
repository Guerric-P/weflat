import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized, GuardsCheckEnd } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthGuard } from '../../guards/auth.guard';
import { LocalStorageService } from '../../services/local-storage.service';
import { ShowSigninPopupService } from '../../services/show-signin-popup.service';
import { Constantes } from '../../../shared/common/Constantes';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute,
    private authGuard: AuthGuard,
    private localStorageService: LocalStorageService,
    private notificationsService: NotificationsService,
    private showSigninPopupService: ShowSigninPopupService,
    private dialog: MatDialog) { }

  private routeData;
  model: any = {};
  returnUrl: string;
  disabled: boolean;
  errorMessage: string;
  routerEventsSubscription: Subscription;
  showSigninPopupSubscription: Subscription;
  isCollapsed: boolean = true;
  @ViewChild('signinModal') signinModalTemplate: TemplateRef<any>;
  @ViewChild('signupModal') signupModalemplate: TemplateRef<any>;
  signinModal: MatDialogRef<any>;
  signupModal: MatDialogRef<any>;

  ngOnInit() {

    if (this.authService.returnUrl) {
      this.router.navigate([this.authService.returnUrl]);
    }

    this.routerEventsSubscription = this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.routeData = data.state.root.firstChild.data;
      }
      if (data instanceof GuardsCheckEnd) {
        if (!data.shouldActivate) {
          this.errorMessage = 'Vous n\'avez pas accès à cette fonctionnalité, veuillez vous connecter avec un compte approprié';
          this.displaySigninPopup();
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
    setTimeout.bind(this)(this.openSignin(this.signinModalTemplate), 1);
  }

  get token() {
    return this.localStorageService.token;
  }

  get displayName() {
    return this.localStorageService.tokenPayload.displayName;
  }

  openSignup(content) {
    this.signupModal = this.dialog.open(content);

    this.signupModal.afterClosed().subscribe((result) => {
      if (result)
        this.router.navigate([`/register/${result}`]);
    }, (reason) => {

    });
  }

  openSignin(content) {
    this.signinModal = this.dialog.open(content);

    this.signinModal.afterClosed().subscribe((result) => {
      this.errorMessage = null;
      this.authService.returnUrl = null;
    }, (reason) => {
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
        data => {
          this.signinModal.close();
          if (this.authService.returnUrl) {
            this.router.navigate([this.authService.returnUrl]);
            this.authService.returnUrl = null;
          }
        },
        error => {
          this.errorMessage = 'Erreur lors de l\'authentification';
          this.disabled = false;
        });
  }

  redirectToPersonal() {
    let role = this.localStorageService.tokenPayload.roles[0].authority;

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

    this.authService.logout().subscribe(res => {
      this.redirectIfAuthRequired();
    }, err => {
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
}

