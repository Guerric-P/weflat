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
          this.disableScroll();
        }
        else {
          this.enableScroll();
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  keys = {37: 1, 38: 1, 39: 1, 40: 1};

  preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;  
  }

  preventDefaultForScrollKeys(e) {
    if (this.keys[e.keyCode]) {
        this.preventDefault(e);
        return false;
    }
}
  
  disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onwheel = this.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    window.ontouchmove  = this.preventDefault; // mobile
    document.onkeydown  = this.preventDefaultForScrollKeys;
  }
  
  enableScroll() {
      if (window.removeEventListener)
          window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
      window.onmousewheel = document.onmousewheel = null; 
      window.onwheel = null; 
      window.ontouchmove = null;  
      document.onkeydown = null;  
  }

}
