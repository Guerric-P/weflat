import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  notificationOptions: any = {
    timeOut: 5000,
    showProgressBar: false
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      if ((<any>window).gtag) {
        (<any>window).gtag('config', (<any>window).googleId, {
          'page_path': evt.urlAfterRedirects
        });
      }

      window.scrollTo(0, 0);
    });
  }
}
