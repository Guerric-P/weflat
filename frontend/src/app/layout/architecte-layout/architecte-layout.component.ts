import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/services/authentication.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { AuthGuard } from 'app/guards/auth.guard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'app/services/local-storage.service';
import { VisiteService } from 'app/services/visite.service';
import { VisiteCounterService } from 'app/services/visite-counter.service';
import { BaseBackendLayoutComponent } from 'app/layout/base-backend-layout/base-backend-layout.component';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-architecte-layout',
  templateUrl: './architecte-layout.component.html',
  styleUrls: ['./architecte-layout.component.css']
})
export class ArchitecteLayoutComponent extends BaseBackendLayoutComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  ngOnInit() {
    super.ngOnInit();
    this.subscription = this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
