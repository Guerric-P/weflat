import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { BaseBackendLayoutComponent } from '../base-backend-layout/base-backend-layout.component';

@Component({
  selector: 'app-architecte-layout',
  templateUrl: './architecte-layout.component.html',
  styleUrls: ['./architecte-layout.component.scss']
})
export class ArchitecteLayoutComponent extends BaseBackendLayoutComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  ngOnInit() {
    super.ngOnInit();
    this.subscription = this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized && this.authService.isArchitect) {
        this.visiteCounterService.announceCount();
      }
    });
    this.visiteService.getVisitCounter().subscribe(res => {
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
