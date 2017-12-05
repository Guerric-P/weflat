import { Component, OnInit, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'app/services/local-storage.service';
import { Constantes } from 'app/common/Constantes';
import { NotificationsService } from 'angular2-notifications';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthenticationService,
    private router: Router, private route: ActivatedRoute,
    private authGuard: AuthGuard,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private notificationsService: NotificationsService) { }

  private routeData;
  model: any = {};
  returnUrl: string;
  disabled: boolean;
  errorMessage: string;
  signinModal: NgbModalRef;
  signupModal: NgbModalRef;
  @ViewChild('signinModal') signinModalTemplate: TemplateRef<any>;

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.returnUrl && this.returnUrl.length !== 1) {
      var self = this;
      setTimeout(function () {
        self.openSignin(self.signinModalTemplate);
      }, 1)

    }

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.routeData = data.state.root.firstChild.data;
      }
    });
  }

  get token() {
    return this.localStorageService.token;
  }

  get displayName() {
    return this.localStorageService.tokenPayload.displayName;
  }

  openSignup(content) {
    this.signupModal = this.modalService.open(content);

    this.signupModal.result.then((result) => {
      this.router.navigate([`/register/${result}`]);
    }, (reason) => {

    });
  }

  openSignin(content) {
    this.signinModal = this.modalService.open(content);

    this.signinModal.result.then((result) => {

    }, (reason) => {

    });
  }

  login() {
    this.disabled = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        this.signinModal.close();
        this.router.navigate([this.returnUrl]);
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
    }
  }

  logout() {

    this.authService.logout();
    if (this.routeData && this.routeData.authRequired) {
      this.authGuard.canActivate(
        this.route.snapshot,
        this.router.routerState.snapshot
      )
    }
  }
}

