import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../services/loader.service';
import { Overlay, ScrollStrategyOptions, BlockScrollStrategy } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  show = false;
  message: string;
  private subscription: Subscription;
  @ViewChild('loader') loader: TemplateRef<any>;
  
  constructor(
    private loaderService: LoaderService,
    private overlay: Overlay,
    private vcr: ViewContainerRef
  ) { }

  ngOnInit() {
    const overlayRef = this.overlay.create(
      {
        hasBackdrop: true,
        scrollStrategy: this.overlay.scrollStrategies.block()
      }
    );
    this.subscription = this.loaderService.loaderState
      .subscribe((state) => {
        this.show = state.show;
        this.message = state.message;
        if(this.show) {
          overlayRef.attach(new TemplatePortal(this.loader, this.vcr));
        }
        else {
          overlayRef.detach();
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
