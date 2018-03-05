import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  show = false;
  message: string;
  private subscription: Subscription;
  
  constructor(
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state) => {
        this.show = state.show;
        this.message = state.message;
        if(this.show) {
          document.body.style.overflow = 'hidden';
        }
        else {
          document.body.style.overflow = 'visible';
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
